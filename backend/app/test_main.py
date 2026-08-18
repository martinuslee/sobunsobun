import os
import tempfile

os.environ["SOBUN_DATABASE_URL"] = f"sqlite:///{tempfile.NamedTemporaryFile(suffix='.sqlite3').name}"

from fastapi.testclient import TestClient

from backend.app.db.base import Base
from backend.app.db.session import engine
from backend.app.main import app


def test_backend_crud() -> None:
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    with TestClient(app) as client:
        assert client.get("/users/email-available", params={"email": "bad-email"}).status_code == 400
        assert client.get("/users/email-available", params={"email": "green@example.com"}).json()["available"] is True

        signup = client.post(
            "/users/signup",
            json={
                "name": "초록이웃",
                "email": "Green@Example.com",
                "password": "password123",
                "password_confirm": "password123",
            },
        )
        assert signup.status_code == 201
        assert signup.json()["email"] == "green@example.com"
        assert client.get("/users/email-available", params={"email": "green@example.com"}).json()["available"] is False
        assert client.post(
            "/users/signup",
            json={
                "name": "다른이웃",
                "email": "green@example.com",
                "password": "password123",
                "password_confirm": "password123",
            },
        ).status_code == 409
        assert client.post(
            "/users/signup",
            json={
                "name": "새이웃",
                "email": "new@example.com",
                "password": "password123",
                "password_confirm": "password456",
            },
        ).status_code == 400

        payload = {
            "title": "딸기 같이 나눠요",
            "category": "과일",
            "sub_category": "베리류/딸기",
            "location": "역삼동",
            "total_price": 18000,
            "total_members": 3,
            "image_url": "data:image/png;base64,test",
            "host_name": "초록이웃",
            "meeting_place": "역삼1동 주민센터 앞",
        }

        created = client.post("/items", json=payload)
        assert created.status_code == 201
        item = created.json()
        assert item["price_per_person"] == 6000
        assert item["unit"] == "1인 (33%)"

        listed = client.get("/items")
        assert listed.status_code == 200
        assert listed.json()[0]["sub_category"] == "베리류/딸기"

        updated = client.patch(f"/items/{item['id']}", json={"current_members": 2})
        assert updated.status_code == 200
        assert updated.json()["current_members"] == 2

        forbidden = client.delete(f"/items/{item['id']}", params={"host_name": "다른사용자"})
        assert forbidden.status_code == 403

        deleted = client.delete(f"/items/{item['id']}", params={"host_name": payload["host_name"]})
        assert deleted.status_code == 204
        assert client.get(f"/items/{item['id']}").status_code == 404

        item = client.post("/items", json=payload).json()

        message = client.post(
            "/chat-messages",
            json={
                "item_id": item["id"],
                "sender_name": "나",
                "text": "참여하고 싶어요",
            },
        )
        assert message.status_code == 201
        assert client.get("/chat-messages").json()[0]["text"] == "참여하고 싶어요"
        assert client.patch(f"/chat-messages/{message.json()['id']}", json={"text": "수정"}).json()["text"] == "수정"
        assert client.delete(f"/chat-messages/{message.json()['id']}").status_code == 204

        notification = client.post(
            "/notifications",
            json={
                "title": "새 알림",
                "content": "내용",
                "type": "chat",
            },
        )
        assert notification.status_code == 201
        assert client.patch(f"/notifications/{notification.json()['id']}", json={"read": True}).json()["read"] is True
        assert client.delete(f"/notifications/{notification.json()['id']}").status_code == 204

        review = client.post(
            "/reviews",
            json={
                "item_id": item["id"],
                "host_name": "초록이웃",
                "rating": 5,
                "tags": ["친절해요"],
                "comment": "좋았어요",
            },
        )
        assert review.status_code == 201
        assert review.json()["tags"] == ["친절해요"]
        assert client.patch(f"/reviews/{review.json()['id']}", json={"rating": 4}).json()["rating"] == 4
        assert client.delete(f"/reviews/{review.json()['id']}").status_code == 204


def test_group_buy_item_crud() -> None:
    test_backend_crud()
