# Frontend

```bash
npm install
npm run dev
```

Backend API: `NEXT_PUBLIC_API_URL=http://localhost:8000`

모집글, 채팅, 알림, 리뷰는 FastAPI 백엔드 API를 사용합니다.

## Structure

- `app/`: Next.js routes, layout, and route-local client containers.
- `components/`: shared and page UI components.
- `lib/`: API boundary, navigation helpers, Google Maps, mock data/assets.
- `store/`: Zustand global UI state.
- `providers.tsx`: React Query provider.
- `types.ts`: shared TypeScript types.
