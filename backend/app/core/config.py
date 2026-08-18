import os
from dataclasses import dataclass
from pathlib import Path
from urllib.parse import parse_qsl, urlencode, urlsplit, urlunsplit


def load_env_file() -> None:
    """로컬 개발용 `.env` 값을 프로세스 환경에 주입합니다."""

    env_path = Path(__file__).resolve().parents[2] / ".env"
    if not env_path.exists():
        return

    for line in env_path.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue

        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


def normalize_database_url(url: str) -> str:
    """Postgres 접속 URL을 SQLAlchemy 드라이버 형식으로 맞춥니다."""

    if url.startswith("postgres://"):
        url = url.replace("postgres://", "postgresql+psycopg://", 1)
    if url.startswith("postgresql://"):
        url = url.replace("postgresql://", "postgresql+psycopg://", 1)
    if url.startswith("postgresql+psycopg://"):
        parts = urlsplit(url)
        query = urlencode([(key, value) for key, value in parse_qsl(parts.query) if key == "sslmode"])
        return urlunsplit((parts.scheme, parts.netloc, parts.path, query, parts.fragment))
    return url


def get_database_url() -> str:
    """환경 변수 우선순위에 따라 DB 접속 URL을 반환합니다."""

    return normalize_database_url(
        os.environ.get("SOBUN_DATABASE_URL")
        or os.environ.get("POSTGRES_URL")
        or os.environ.get("POSTGRES_PRISMA_URL")
        or os.environ.get("POSTGRES_URL_NON_POOLING")
        or "sqlite:///./backend/sobunsobun.sqlite3"
    )


load_env_file()


@dataclass(frozen=True)
class Settings:
    """환경 변수에서 읽는 애플리케이션 설정입니다."""

    database_url: str = get_database_url()


settings = Settings()
