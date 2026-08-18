# 소분소분

이웃과 함께 생활용품, 가공식품 등을 필요한 만큼 나눠 사는 동네 공동구매 웹 플랫폼입니다.

## 구성

- `frontend/`: Next.js 프론트엔드
- `backend/`: FastAPI 백엔드 API
- `backend/docs/database-design.md`: DB 설계 문서
- `design/`: 초기 디자인 참고 자료. 런타임 코드에서 직접 사용하지 않습니다.
- `document.md`: 서비스 정책 및 기획 참고 문서

## 주요 기능

- 랜딩, 로그인, 회원가입, 약관 화면
- 공동구매 모집글 목록, 상세, 등록, 삭제
- 대표 사진 파일 업로드
- 만남 희망 시간 선택
- 동네 설정과 소분 탐색 반경 설정
- 채팅, 알림, 리뷰 CRUD
- 이메일 형식 검증과 중복 확인

## 기술 스택

- Frontend: Next.js, React, TypeScript, React Query, Zustand
- Backend: FastAPI, SQLAlchemy, Alembic
- Database: SQLite 로컬 기본값, Supabase Postgres 배포 DB
- Map: Google Maps JavaScript API

## 시작하기

```bash
make install
```

환경변수 예시 파일을 복사합니다.

```bash
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

프론트엔드 필수 값:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
NEXT_PUBLIC_API_URL=http://localhost:8000
```

백엔드는 DB URL이 없으면 SQLite 파일(`backend/sobunsobun.sqlite3`)을 사용합니다.
Supabase Postgres를 쓰려면 `backend/.env` 또는 배포 환경변수에 `SOBUN_DATABASE_URL`을 설정합니다.

```bash
make migrate
make seed
make dev
```

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8000`
- Health check: `http://localhost:8000/health`

## 자주 쓰는 명령어

```bash
make frontend      # 프론트엔드 개발 서버
make backend       # DB 마이그레이션 후 백엔드 개발 서버
make dev           # 프론트엔드와 백엔드 동시 실행
make migrate       # Alembic 마이그레이션 적용
make seed          # 목업 데이터 입력
make lint          # 프론트엔드 타입 체크
make build         # 프론트엔드 빌드
make test-backend  # 백엔드 CRUD 체크
make clean         # 프론트엔드 빌드 캐시 제거
```

## 배포

프론트엔드 Vercel 설정:

```text
Root Directory: frontend
Build Command: npm run build
Output Directory: .next
```

백엔드 Vercel 설정:

```text
Root Directory: backend
Entry: app/main.py
Install Command: pip install -r requirements.txt
```

프론트엔드 배포 URL이 `https://sobunsobun-mvp.vercel.app`일 때는 현재 백엔드 CORS 설정에 포함되어 있습니다.

## 문서

- [프론트엔드 문서](frontend/README.md)
- [백엔드 문서](backend/README.md)
- [DB 설계 문서](backend/docs/database-design.md)
- [디자인 참고 문서](design/README.md)

## 환경변수 관리

실제 환경변수 파일인 `.env`, `.env.local`, `frontend/.env`, `backend/.env`는 커밋하지 않습니다.
공유가 필요한 값은 각 `.env.example`에 키 이름만 추가합니다.
