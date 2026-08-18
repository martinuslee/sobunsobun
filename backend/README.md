# Backend

```bash
make install
make migrate
make seed
make backend
```

Health check: `GET http://localhost:8000/health`

## Deploy

Vercel에서 백엔드만 배포할 때:

```text
Root Directory: backend
Entry: app/main.py
Install Command: pip install -r requirements.txt
```

이 구조에서는 앱이 `app.main`으로 import됩니다. 로컬 프로젝트 루트에서는 기존처럼 `backend.app.main`으로 실행해도 됩니다.

## Stack

- FastAPI
- SQLAlchemy ORM
- Alembic
- SQLite

## Database

SQLite file: `backend/sobunsobun.sqlite3`

Override:

```bash
SOBUN_DATABASE_URL=sqlite:///./backend/dev.sqlite3 make migrate
```

Normalized tables:

- `users`: 가입 사용자와 모집글 작성자
- `categories`: 대분류/소분류. `parent_id`로 계층 구성
- `locations`: 동네/지역
- `group_buy_items`: 공동구매 모집글. 작성자/카테고리/지역은 FK로 참조
- `chat_messages`: 모집글별 채팅 메시지. 작성자와 모집글을 FK로 참조
- `notifications`: 사용자별 알림
- `reviews`: 모집글 리뷰. 리뷰어/호스트/모집글을 FK로 참조
- `tags`: 리뷰 태그
- `review_tags`: 리뷰와 태그의 N:M 연결

## API

- `GET /items`
- `POST /items`
- `GET /items/{item_id}`
- `PATCH /items/{item_id}`
- `DELETE /items/{item_id}?host_name={작성자명}`
- `GET /users/email-available?email={이메일}`
- `POST /users/signup`
- `POST /users/login`
- `GET /chat-messages`
- `POST /chat-messages`
- `PATCH /chat-messages/{message_id}`
- `DELETE /chat-messages/{message_id}`
- `GET /notifications`
- `POST /notifications`
- `PATCH /notifications/{notification_id}`
- `DELETE /notifications/{notification_id}`
- `GET /reviews`
- `POST /reviews`
- `PATCH /reviews/{review_id}`
- `DELETE /reviews/{review_id}`

## Seed

```bash
make seed
```

프론트 목업 모집글, 채팅, 알림, 리뷰를 DB에 추가합니다. 이미 들어간 데이터는 다시 넣지 않습니다.

`POST /items` body:

```json
{
  "title": "딸기 같이 나눠요",
  "category": "과일",
  "sub_category": "베리류/딸기",
  "location": "역삼동",
  "total_price": 18000,
  "total_members": 3,
  "image_url": "data:image/png;base64,...",
  "host_name": "초록이웃",
  "meeting_place": "역삼1동 주민센터 앞"
}
```

`POST /users/signup` body:

```json
{
  "name": "초록이웃",
  "email": "green@example.com",
  "password": "password123",
  "password_confirm": "password123"
}
```

`POST /users/login` body:

```json
{
  "email": "green@example.com",
  "password": "password123"
}
```

## Structure

```text
backend/app/main.py             FastAPI app
backend/app/api/routes/items.py Item CRUD routes
backend/app/api/routes/users.py User signup routes
backend/app/api/routes/chat_messages.py Chat message CRUD routes
backend/app/api/routes/notifications.py Notification CRUD routes
backend/app/api/routes/reviews.py Review CRUD routes
backend/app/models.py           SQLAlchemy models
backend/app/schemas.py          Pydantic schemas
backend/app/db/session.py       DB session dependency
backend/alembic/versions/       DB migrations
```

## Checks

```bash
make test-backend
python3 -m py_compile backend/app/main.py backend/app/models.py backend/app/api/routes/items.py
```
