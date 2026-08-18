# 소분소분

이웃과 함께 생활용품, 가공식품 등을 필요한 만큼 나눠 사는 동네 공동구매 웹 플랫폼입니다.

## 구성

- `frontend/`: Next.js 앱
- `backend/`: FastAPI API 서버
- `design/`: 디자인 참고 자료. 런타임 코드에서 직접 사용하지 않습니다.
- `document.md`: 서비스 정책 및 기획 참고 문서

## 기술 스택

- Frontend: Next.js, React, TypeScript, React Query, Zustand
- Backend: FastAPI, SQLAlchemy, Alembic, SQLite
- Map: Google Maps JavaScript API

## 시작하기

```bash
make install
```

프론트엔드 환경변수 파일을 준비합니다.

```bash
cp frontend/.env.example frontend/.env
```

`frontend/.env`에 Google Maps API 키를 입력합니다.

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
NEXT_PUBLIC_API_URL=http://localhost:8000
```

DB 마이그레이션과 시드 데이터를 적용합니다.

```bash
make migrate
make seed
```

개발 서버를 실행합니다.

```bash
make dev
```

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8000`
- Health check: `http://localhost:8000/health`

## 자주 쓰는 명령어

```bash
make frontend      # 프론트엔드 개발 서버
make backend       # 백엔드 개발 서버
make lint          # 프론트엔드 타입 체크
make build         # 프론트엔드 빌드
make test-backend  # 백엔드 CRUD 체크
make clean         # 프론트엔드 빌드 캐시 제거
```

## 참고

실제 환경변수 파일인 `frontend/.env`는 커밋하지 않습니다. 공유가 필요한 값은 `frontend/.env.example`에 키 이름만 추가합니다.
