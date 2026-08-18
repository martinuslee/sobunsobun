from typing import Any

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from backend.app.db.session import get_db
from backend.app.models import Category, GroupBuyItem, Location, User
from backend.app.schemas import GroupBuyItemCreate, GroupBuyItemRead, GroupBuyItemUpdate

router = APIRouter(prefix="/items", tags=["items"])


def get_or_create_user(db: Session, nickname: str, avatar: str | None, manner_temp: float) -> User:
    """기존 사용자를 반환하거나 쓰기 요청용 사용자를 생성합니다.

    인자:
        db: 활성 데이터베이스 세션.
        nickname: 고유 표시 이름.
        avatar: 선택 아바타 값.
        manner_temp: 사용자 매너 온도.

    반환:
        저장된 사용자 모델.
    """

    user = db.scalar(select(User).where(User.nickname == nickname))
    if user:
        user.avatar = avatar
        user.manner_temp = manner_temp
        return user

    user = User(nickname=nickname, avatar=avatar, manner_temp=manner_temp)
    db.add(user)
    db.flush()
    return user


def get_or_create_location(db: Session, name: str) -> Location:
    """기존 지역을 반환하거나 새로 생성합니다.

    인자:
        db: 활성 데이터베이스 세션.
        name: 클라이언트가 전달한 지역 이름.

    반환:
        저장된 지역 모델.
    """

    location = db.scalar(select(Location).where(Location.name == name))
    if location:
        return location

    location = Location(name=name)
    db.add(location)
    db.flush()
    return location


def get_or_create_category(db: Session, name: str, parent: Category | None = None) -> Category:
    """기존 카테고리 노드를 반환하거나 새로 생성합니다.

    인자:
        db: 활성 데이터베이스 세션.
        name: 카테고리 이름.
        parent: 소분류에 연결할 상위 카테고리.

    반환:
        저장된 카테고리 모델.
    """

    category = db.scalar(
        select(Category).where(Category.name == name, Category.parent_id == (parent.id if parent else None))
    )
    if category:
        return category

    category = Category(name=name, parent=parent)
    db.add(category)
    db.flush()
    return category


def validate_members(current_members: int, total_members: int) -> None:
    """모집 정원을 넘는 참여 인원을 거부합니다.

    인자:
        current_members: 현재 참여 인원.
        total_members: 총 모집 인원.

    예외:
        HTTPException: 현재 참여 인원이 총 모집 인원을 넘을 때.
    """

    if current_members > total_members:
        raise HTTPException(status_code=400, detail="current_members cannot exceed total_members")


def serialize(item: GroupBuyItem) -> dict[str, Any]:
    """정규화된 ORM 모델을 프론트엔드 아이템 형태로 변환합니다.

    인자:
        item: 관계가 로드된 공동구매 ORM 모델.

    반환:
        `GroupBuyItemRead`에 맞는 API 응답 딕셔너리.
    """

    parent = item.category.parent
    return {
        "id": item.id,
        "title": item.title,
        "category": parent.name if parent else item.category.name,
        "sub_category": item.category.name if parent else None,
        "location": item.location.name,
        "distance": item.distance,
        "price_per_person": round(item.total_price / item.total_members),
        "total_price": item.total_price,
        "total_members": item.total_members,
        "current_members": item.current_members,
        "unit": item.unit,
        "image_url": item.image_url,
        "urgent": item.urgent,
        "host_name": item.host.nickname,
        "host_avatar": item.host.avatar,
        "host_manner_temp": item.host.manner_temp,
        "meeting_place": item.meeting_place,
        "meeting_place_detail": item.meeting_place_detail,
        "description": item.description,
        "deadline": item.deadline,
        "is_liked": item.is_liked,
        "status": item.status,
        "created_at": str(item.created_at),
        "updated_at": str(item.updated_at),
    }


def item_or_404(db: Session, item_id: int) -> GroupBuyItem:
    """아이템을 조회하거나 404 응답을 발생시킵니다.

    인자:
        db: 활성 데이터베이스 세션.
        item_id: 공동구매 아이템 ID.

    반환:
        조회된 공동구매 아이템.

    예외:
        HTTPException: 아이템이 존재하지 않을 때.
    """

    item = db.get(GroupBuyItem, item_id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@router.get("", response_model=list[GroupBuyItemRead])
def list_items(db: Session = Depends(get_db)) -> list[dict[str, Any]]:
    """공동구매 모집글을 최신순으로 조회합니다."""

    items = db.scalars(select(GroupBuyItem).order_by(GroupBuyItem.id.desc())).all()
    return [serialize(item) for item in items]


@router.post("", response_model=GroupBuyItemRead, status_code=201)
def create_item(payload: GroupBuyItemCreate, db: Session = Depends(get_db)) -> dict[str, Any]:
    """공동구매 모집글과 참조용 행을 생성합니다."""

    validate_members(payload.current_members, payload.total_members)

    parent_category = get_or_create_category(db, payload.category)
    category = get_or_create_category(db, payload.sub_category, parent_category) if payload.sub_category else parent_category
    location = get_or_create_location(db, payload.location)
    host = get_or_create_user(db, payload.host_name, payload.host_avatar, payload.host_manner_temp)

    item = GroupBuyItem(
        title=payload.title,
        category=category,
        location=location,
        host=host,
        distance=payload.distance,
        total_price=payload.total_price,
        total_members=payload.total_members,
        current_members=payload.current_members,
        unit=payload.unit or f"1인 ({round(100 / payload.total_members)}%)",
        image_url=payload.image_url,
        urgent=payload.urgent,
        meeting_place=payload.meeting_place,
        meeting_place_detail=payload.meeting_place_detail,
        description=payload.description,
        deadline=payload.deadline,
    )
    db.add(item)
    try:
        db.commit()
    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(exc.orig)) from exc
    db.refresh(item)
    return serialize(item)


@router.get("/{item_id}", response_model=GroupBuyItemRead)
def get_item(item_id: int, db: Session = Depends(get_db)) -> dict[str, Any]:
    """ID로 공동구매 모집글 하나를 조회합니다."""

    return serialize(item_or_404(db, item_id))


@router.patch("/{item_id}", response_model=GroupBuyItemRead)
def update_item(item_id: int, payload: GroupBuyItemUpdate, db: Session = Depends(get_db)) -> dict[str, Any]:
    """공동구매 모집글과 정규화된 참조를 부분 수정합니다."""

    item = item_or_404(db, item_id)
    data = payload.model_dump(exclude_unset=True)

    if "category" in data or "sub_category" in data:
        category_name = data.pop("category", item.category.parent.name if item.category.parent else item.category.name)
        sub_category_name = data.pop("sub_category", item.category.name if item.category.parent else None)
        parent_category = get_or_create_category(db, category_name)
        item.category = get_or_create_category(db, sub_category_name, parent_category) if sub_category_name else parent_category

    if "location" in data:
        item.location = get_or_create_location(db, data.pop("location"))

    if "host_name" in data or "host_avatar" in data or "host_manner_temp" in data:
        item.host = get_or_create_user(
            db,
            data.pop("host_name", item.host.nickname),
            data.pop("host_avatar", item.host.avatar),
            data.pop("host_manner_temp", item.host.manner_temp),
        )

    for key, value in data.items():
        setattr(item, key, value)

    validate_members(item.current_members, item.total_members)
    try:
        db.commit()
    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(exc.orig)) from exc
    db.refresh(item)
    return serialize(item)


@router.delete("/{item_id}", status_code=204)
def delete_item(item_id: int, host_name: str = Query(min_length=1), db: Session = Depends(get_db)) -> None:
    """작성자가 요청한 경우에만 공동구매 모집글 하나를 삭제합니다.

    인자:
        item_id: 공동구매 아이템 ID.
        host_name: 삭제를 요청한 사용자 닉네임.
        db: 활성 데이터베이스 세션.

    예외:
        HTTPException: 작성자가 아닌 사용자가 삭제를 요청할 때.
    """

    item = item_or_404(db, item_id)
    if item.host.nickname != host_name:
        raise HTTPException(status_code=403, detail="Only the host can delete this item")

    db.delete(item)
    db.commit()
