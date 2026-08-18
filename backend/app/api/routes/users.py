import hashlib
import hmac
import re
import secrets

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from ...db.session import get_db
from ...models import User
from ...schemas import EmailAvailabilityRead, UserLoginCreate, UserRead, UserSignupCreate

router = APIRouter(prefix="/users", tags=["users"])
EMAIL_PATTERN = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")


def normalize_email(email: str) -> str:
    """이메일 형식을 검증하고 소문자로 정규화합니다.

    인자:
        email: 사용자가 입력한 이메일.

    반환:
        정규화된 이메일.

    예외:
        HTTPException: 이메일 형식이 올바르지 않을 때.
    """

    normalized = email.strip().lower()
    if not EMAIL_PATTERN.fullmatch(normalized):
        raise HTTPException(status_code=400, detail="Invalid email")
    return normalized


def hash_password(password: str) -> str:
    """비밀번호를 PBKDF2 해시 문자열로 변환합니다.

    인자:
        password: 사용자가 입력한 평문 비밀번호.

    반환:
        저장 가능한 해시 문자열.
    """

    salt = secrets.token_hex(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode(), salt.encode(), 100_000).hex()
    return f"pbkdf2_sha256$100000${salt}${digest}"


def verify_password(password: str, password_hash: str | None) -> bool:
    if not password_hash:
        return False

    try:
        algorithm, iterations, salt, expected = password_hash.split("$")
        iteration_count = int(iterations)
    except ValueError:
        return False

    if algorithm != "pbkdf2_sha256":
        return False

    digest = hashlib.pbkdf2_hmac("sha256", password.encode(), salt.encode(), iteration_count).hex()
    return hmac.compare_digest(digest, expected)


def serialize_user(user: User) -> dict[str, str | int]:
    """사용자 모델을 공개 응답 형태로 변환합니다."""

    return {"id": user.id, "name": user.nickname, "email": user.email or ""}


@router.get("/email-available", response_model=EmailAvailabilityRead)
def check_email_available(email: str = Query(min_length=3), db: Session = Depends(get_db)) -> dict[str, bool]:
    """이메일 가입 가능 여부를 반환합니다."""

    normalized = normalize_email(email)
    exists = db.scalar(select(User).where(User.email == normalized))
    return {"available": exists is None}


@router.post("/signup", response_model=UserRead, status_code=201)
def signup(payload: UserSignupCreate, db: Session = Depends(get_db)) -> dict[str, str | int]:
    """이름, 이메일, 비밀번호로 사용자를 가입 처리합니다."""

    if payload.password != payload.password_confirm:
        raise HTTPException(status_code=400, detail="Passwords do not match")

    email = normalize_email(payload.email)
    if db.scalar(select(User).where(User.email == email)):
        raise HTTPException(status_code=409, detail="Email already exists")

    user = db.scalar(select(User).where(User.nickname == payload.name))
    if user and user.email:
        raise HTTPException(status_code=409, detail="Name already exists")

    if user is None:
        user = User(nickname=payload.name, avatar="🌱", manner_temp=36.5)
        db.add(user)

    user.email = email
    user.password_hash = hash_password(payload.password)

    try:
        db.commit()
    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(status_code=409, detail=str(exc.orig)) from exc

    db.refresh(user)
    return serialize_user(user)


@router.post("/login", response_model=UserRead)
def login(payload: UserLoginCreate, db: Session = Depends(get_db)) -> dict[str, str | int]:
    """이메일과 비밀번호로 사용자를 로그인 처리합니다."""

    email = normalize_email(payload.email)
    user = db.scalar(select(User).where(User.email == email))
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    return serialize_user(user)
