# Frontend

소분소분 Next.js 프론트엔드입니다.

## 실행

루트에서 실행하는 것을 기본으로 합니다.

```bash
make install
make frontend
```

프론트엔드만 직접 실행할 때:

```bash
npm install
npm run dev
```

개발 서버: `http://localhost:3000`

## 환경변수

```bash
cp frontend/.env.example frontend/.env
```

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
NEXT_PUBLIC_API_URL=http://localhost:8000
```

- `NEXT_PUBLIC_API_URL`: FastAPI 백엔드 주소
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: 위치 검색과 지도 표시용 Google Maps API 키

## 주요 화면

- `/`: 랜딩과 홈
- `/signup`: 회원가입
- `/login`: 로그인
- `/create`: 모집하기
- `/posts/[id]`: 모집글 상세
- `/join/[id]`: 참여와 만남 희망 시간 선택
- `/chat/[id]`: 채팅
- `/notifications`: 알림
- `/history`: 마이페이지
- `/reviews/write`, `/reviews/complete`: 후기 작성/완료
- `/location`: 동네와 탐색 반경 설정
- `/terms`: 약관 안내

## API 연결

모집글, 채팅, 알림, 리뷰, 회원가입/로그인은 `src/lib/api.ts`에서 FastAPI 백엔드와 통신합니다.
백엔드 목업 데이터는 루트에서 `make seed`로 입력합니다.

## 구조

```text
src/app/          Next.js App Router
src/features/     페이지별 컨테이너
src/components/   공통 UI 컴포넌트
src/lib/          API, 지도, 위치, 정적 데이터 유틸
src/stores/       Zustand 상태
src/types/        공통 타입
```

## 검증

```bash
make lint
make build
```

## 배포

Vercel 프론트엔드 설정:

```text
Root Directory: frontend
Build Command: npm run build
Output Directory: .next
```

배포 환경변수에는 `NEXT_PUBLIC_API_URL`을 운영 백엔드 URL로 설정합니다.
