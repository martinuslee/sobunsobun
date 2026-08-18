import os
from dataclasses import dataclass


@dataclass(frozen=True)
class Settings:
    """환경 변수에서 읽는 애플리케이션 설정입니다."""

    database_url: str = os.environ.get(
        "SOBUN_DATABASE_URL",
        "sqlite:///./backend/sobunsobun.sqlite3",
    )


settings = Settings()
