from urllib.parse import quote

from sqlalchemy import select

from backend.app.api.routes.items import get_or_create_category, get_or_create_location, get_or_create_user
from backend.app.api.routes.reviews import get_or_create_tag
from backend.app.db.session import SessionLocal
from backend.app.models import ChatMessage, GroupBuyItem, Notification, Review


def product_image(label: str, accent: str, detail: str) -> str:
    """프론트 목업과 같은 용도의 간단한 SVG data URL을 만듭니다."""

    svg = f"""
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 420">
  <rect width="640" height="420" fill="{accent}"/>
  <text x="320" y="180" text-anchor="middle" font-family="Arial, sans-serif" font-size="52" font-weight="800" fill="#ffffff">{label}</text>
  <text x="320" y="245" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" font-weight="700" fill="#ffffff">{detail}</text>
</svg>
"""
    return f"data:image/svg+xml;utf8,{quote(svg)}"


MOCK_ITEMS = [
    {
        "title": "즉석밥 24개입 박스 나눠요",
        "category": "즉석식품",
        "sub_category": "즉석밥/컵밥",
        "location": "역삼1동",
        "distance": "500m",
        "total_price": 33000,
        "total_members": 3,
        "current_members": 2,
        "unit": "1인 (8개)",
        "image_url": product_image("즉석밥", "#316b00", "24개입 박스"),
        "urgent": True,
        "host_name": "밥친구",
        "host_avatar": "🍚",
        "host_manner_temp": 37.8,
        "meeting_place": "역삼1동 주민센터 앞",
        "meeting_place_detail": "강남구 역삼로 123",
        "description": "제조사 개별 포장된 즉석밥 24개입 박스를 구매했습니다. 미개봉 낱개 단위로 8개씩 나눕니다. 오늘 오후 5시~7시 사이에 전달 가능합니다.",
        "deadline": "오늘 18:00",
        "is_liked": False,
    },
    {
        "title": "컵라면 12개입 박스 같이 나눠요",
        "category": "즉석식품",
        "sub_category": "컵라면",
        "location": "역삼2동",
        "distance": "1.2km",
        "total_price": 18000,
        "total_members": 4,
        "current_members": 2,
        "unit": "1인 (3개)",
        "image_url": product_image("컵라면", "#c65f00", "12개입 박스"),
        "urgent": False,
        "host_name": "면모임",
        "host_avatar": "🍜",
        "host_manner_temp": 39.1,
        "meeting_place": "역삼역 3번 출구",
        "meeting_place_detail": "강남구 테헤란로 152",
        "description": "컵라면 12개입 박스를 샀는데 혼자 먹기엔 많아서 나눕니다. 제조사 포장 그대로 3개씩 전달합니다.",
        "deadline": "오늘 20:00",
        "is_liked": True,
    },
    {
        "title": "탄산수 24캔 묶음 나눌 분",
        "category": "음료",
        "sub_category": "생수/탄산수",
        "location": "도곡동",
        "distance": "800m",
        "total_price": 18000,
        "total_members": 3,
        "current_members": 2,
        "unit": "1인 (8캔)",
        "image_url": product_image("탄산수", "#0077b6", "24캔 묶음"),
        "urgent": False,
        "host_name": "탄산러버",
        "host_avatar": "🥤",
        "host_manner_temp": 38.5,
        "meeting_place": "도곡역 2번 출구 우리은행 앞",
        "meeting_place_detail": "강남구 남부순환로 2800",
        "description": "탄산수 24캔 묶음을 구매했습니다. 캔 단위로 8개씩 가져가시면 됩니다. 박스만 개봉하고 상품 포장은 그대로입니다.",
        "deadline": "내일 12:00",
        "is_liked": False,
    },
    {
        "title": "스틱커피 100T 반씩 나눠요",
        "category": "커피/차",
        "sub_category": "스틱커피/티백",
        "location": "역삼1동",
        "distance": "300m",
        "total_price": 25000,
        "total_members": 4,
        "current_members": 1,
        "unit": "1인 (25개)",
        "image_url": product_image("커피", "#6f4e37", "100T 묶음"),
        "urgent": True,
        "host_name": "커피한잔",
        "host_avatar": "☕",
        "host_manner_temp": 36.9,
        "meeting_place": "우리은행 마두지점 / 역삼지점",
        "meeting_place_detail": "강남구 역삼로 200",
        "description": "스틱커피 100T 대용량을 샀습니다. 개별 스틱 포장 그대로 25개씩 나눕니다.",
        "deadline": "오늘 17:00",
        "is_liked": False,
    },
]

MOCK_CHAT_MESSAGES = [
    {
        "item_title": "스틱커피 100T 반씩 나눠요",
        "sender_name": "나",
        "avatar": None,
        "text": "안녕하세요! 소분 참여하고 싶어요. 어디서 뵐까요? 😊",
        "type": "text",
        "time": "오후 2:30",
        "date": "2023년 10월 26일 목요일",
    },
    {
        "item_title": "스틱커피 100T 반씩 나눠요",
        "sender_name": "커피한잔",
        "avatar": "☕",
        "text": "안녕하세요! 마두역 우리은행 앞에서 5시에 뵙는 건 어떠세요?",
        "type": "text",
        "time": "오후 2:35",
        "date": None,
    },
    {
        "item_title": "스틱커피 100T 반씩 나눠요",
        "sender_name": "커피한잔",
        "avatar": "☕",
        "text": None,
        "type": "location_proposal",
        "location_name": "우리은행 마두지점",
        "location_detail": "경기 고양시 일산동구 중앙로 1195",
        "time": "오후 2:35",
        "date": None,
    },
]

MOCK_NOTIFICATIONS = [
    {
        "title": "소분 모집 완료!",
        "content": "'즉석밥 24개입 박스 나눠요' 3명이 모두 모였습니다. 거래 장소를 확인하세요.",
        "time_ago": "5분 전",
        "type": "group_buy",
        "read": False,
        "target_screen": "detail",
    },
    {
        "title": "새로운 메시지 도착",
        "content": "'커피한잔'님이 거래 장소를 제안했습니다: 우리은행 마두지점",
        "time_ago": "15분 전",
        "type": "chat",
        "read": False,
        "target_screen": "chat_detail",
    },
    {
        "title": "키워드 알림",
        "content": "관심 키워드 '컵라면' 새 글이 역삼1동에 등록되었습니다.",
        "time_ago": "1시간 전",
        "type": "keyword",
        "read": True,
        "target_screen": "home",
    },
    {
        "title": "후기 작성 요청",
        "content": "'탄산수 24캔 묶음' 소분이 완료되었습니다. 따뜻한 후기를 남겨주세요!",
        "time_ago": "어제",
        "type": "review",
        "read": True,
        "target_screen": "review_write",
    },
]

MOCK_REVIEWS = [
    {
        "item_title": "탄산수 24캔 묶음 나눌 분",
        "reviewer_name": "나",
        "host_name": "탄산러버",
        "rating": 5,
        "tags": ["상품 상태가 정확해요", "약속 시간을 잘 지켜요", "친절해요", "포장이 꼼꼼해요"],
        "comment": "캔 수량과 상태가 설명 그대로라 기분 좋게 나눴습니다. 다음에도 또 참여할게요.",
    },
]


def seed() -> int:
    """목업 데이터를 DB에 추가하고 추가된 행 수를 반환합니다."""

    created = 0
    with SessionLocal() as db:
        current_user = get_or_create_user(db, "나", None, 36.5)

        for data in MOCK_ITEMS:
            if db.scalar(select(GroupBuyItem).where(GroupBuyItem.title == data["title"])):
                continue

            parent_category = get_or_create_category(db, data["category"])
            category = get_or_create_category(db, data["sub_category"], parent_category)
            location = get_or_create_location(db, data["location"])
            host = get_or_create_user(db, data["host_name"], data["host_avatar"], data["host_manner_temp"])

            db.add(
                GroupBuyItem(
                    title=data["title"],
                    category=category,
                    location=location,
                    host=host,
                    distance=data["distance"],
                    total_price=data["total_price"],
                    total_members=data["total_members"],
                    current_members=data["current_members"],
                    unit=data["unit"],
                    image_url=data["image_url"],
                    urgent=data["urgent"],
                    meeting_place=data["meeting_place"],
                    meeting_place_detail=data["meeting_place_detail"],
                    description=data["description"],
                    deadline=data["deadline"],
                    is_liked=data["is_liked"],
                )
            )
            created += 1

        db.flush()

        for data in MOCK_CHAT_MESSAGES:
            item = db.scalar(select(GroupBuyItem).where(GroupBuyItem.title == data["item_title"]))
            if not item or db.scalar(select(ChatMessage).where(ChatMessage.text == data["text"], ChatMessage.item_id == item.id)):
                continue

            sender = get_or_create_user(db, data["sender_name"], data["avatar"], 36.5)
            db.add(
                ChatMessage(
                    item=item,
                    sender=sender,
                    type=data["type"],
                    text=data["text"],
                    location_name=data.get("location_name"),
                    location_detail=data.get("location_detail"),
                    display_time=data["time"],
                    display_date=data["date"],
                )
            )
            created += 1

        for data in MOCK_NOTIFICATIONS:
            if db.scalar(select(Notification).where(Notification.title == data["title"], Notification.content == data["content"])):
                continue

            db.add(Notification(recipient=current_user, **data))
            created += 1

        for data in MOCK_REVIEWS:
            item = db.scalar(select(GroupBuyItem).where(GroupBuyItem.title == data["item_title"]))
            if not item or db.scalar(select(Review).where(Review.item_id == item.id, Review.comment == data["comment"])):
                continue

            reviewer = get_or_create_user(db, data["reviewer_name"], None, 36.5)
            host = get_or_create_user(db, data["host_name"], None, 36.5)
            db.add(
                Review(
                    item=item,
                    reviewer=reviewer,
                    host=host,
                    rating=data["rating"],
                    comment=data["comment"],
                    tags=[get_or_create_tag(db, tag) for tag in data["tags"]],
                )
            )
            created += 1

        db.commit()

    return created


if __name__ == "__main__":
    print(f"created {seed()} mock items")
