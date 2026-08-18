from collections.abc import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from backend.app.core.config import settings

connect_args = {"check_same_thread": False} if settings.database_url.startswith("sqlite") else {}
engine = create_engine(settings.database_url, connect_args=connect_args)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)


def get_db() -> Generator[Session, None, None]:
    """요청 단위 SQLAlchemy 세션을 제공합니다.

    생성값:
        요청 처리가 끝나면 닫히는 데이터베이스 세션.
    """

    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
