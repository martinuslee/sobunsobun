from typing import Literal

from pydantic import BaseModel, Field


class GroupBuyItemCreate(BaseModel):
    """공동구매 모집글 생성 요청 본문입니다."""

    title: str = Field(min_length=1)
    category: str = Field(min_length=1)
    sub_category: str | None = None
    location: str = Field(min_length=1)
    distance: str = "300m"
    total_price: int = Field(gt=0)
    total_members: int = Field(ge=2)
    current_members: int = Field(default=1, ge=1)
    unit: str | None = None
    image_url: str = Field(min_length=1)
    urgent: bool = False
    host_name: str = Field(min_length=1)
    host_avatar: str | None = None
    host_manner_temp: float = 36.5
    meeting_place: str = Field(min_length=1)
    meeting_place_detail: str = ""
    description: str = ""
    deadline: str = ""


class GroupBuyItemUpdate(BaseModel):
    """공동구매 모집글 부분 수정 요청 본문입니다."""

    title: str | None = Field(default=None, min_length=1)
    category: str | None = Field(default=None, min_length=1)
    sub_category: str | None = None
    location: str | None = Field(default=None, min_length=1)
    distance: str | None = None
    total_price: int | None = Field(default=None, gt=0)
    total_members: int | None = Field(default=None, ge=2)
    current_members: int | None = Field(default=None, ge=1)
    unit: str | None = None
    image_url: str | None = Field(default=None, min_length=1)
    urgent: bool | None = None
    host_name: str | None = Field(default=None, min_length=1)
    host_avatar: str | None = None
    host_manner_temp: float | None = None
    meeting_place: str | None = Field(default=None, min_length=1)
    meeting_place_detail: str | None = None
    description: str | None = None
    deadline: str | None = None
    is_liked: bool | None = None
    status: Literal["recruiting", "completed", "canceled"] | None = None


class GroupBuyItemRead(GroupBuyItemCreate):
    """공동구매 모집글 API 응답 본문입니다."""

    id: int
    price_per_person: int
    is_liked: bool
    status: Literal["recruiting", "completed", "canceled"]
    created_at: str
    updated_at: str


class UserSignupCreate(BaseModel):
    """회원가입 요청 본문입니다."""

    name: str = Field(min_length=1, max_length=80)
    email: str = Field(min_length=3, max_length=255)
    password: str = Field(min_length=8)
    password_confirm: str = Field(min_length=8)


class UserLoginCreate(BaseModel):
    """로그인 요청 본문입니다."""

    email: str = Field(min_length=3, max_length=255)
    password: str = Field(min_length=8)


class UserRead(BaseModel):
    """사용자 API 응답 본문입니다."""

    id: int
    name: str
    email: str


class EmailAvailabilityRead(BaseModel):
    """이메일 중복 확인 응답 본문입니다."""

    available: bool


class LocationInfo(BaseModel):
    """채팅 위치 제안 정보입니다."""

    name: str
    detail: str


class ChatMessageCreate(BaseModel):
    """채팅 메시지 생성 요청 본문입니다."""

    item_id: int
    sender_name: str = Field(min_length=1)
    avatar: str | None = None
    text: str | None = None
    type: Literal["text", "location_proposal", "image", "qr"] = "text"
    location_info: LocationInfo | None = None
    time: str = "방금"
    date: str | None = None


class ChatMessageUpdate(BaseModel):
    """채팅 메시지 부분 수정 요청 본문입니다."""

    text: str | None = None
    time: str | None = None
    date: str | None = None


class ChatMessageRead(ChatMessageCreate):
    """채팅 메시지 API 응답 본문입니다."""

    id: int


class NotificationCreate(BaseModel):
    """알림 생성 요청 본문입니다."""

    recipient_name: str = "나"
    title: str = Field(min_length=1)
    content: str = Field(min_length=1)
    time_ago: str = "방금"
    type: Literal["group_buy", "chat", "keyword", "review"]
    read: bool = False
    target_screen: str | None = None


class NotificationUpdate(BaseModel):
    """알림 부분 수정 요청 본문입니다."""

    title: str | None = Field(default=None, min_length=1)
    content: str | None = Field(default=None, min_length=1)
    time_ago: str | None = None
    read: bool | None = None
    target_screen: str | None = None


class NotificationRead(NotificationCreate):
    """알림 API 응답 본문입니다."""

    id: int


class ReviewCreate(BaseModel):
    """리뷰 생성 요청 본문입니다."""

    item_id: int
    reviewer_name: str = "나"
    host_name: str = Field(min_length=1)
    rating: int = Field(ge=1, le=5)
    tags: list[str] = Field(default_factory=list)
    comment: str = ""
    image_url: str | None = None


class ReviewUpdate(BaseModel):
    """리뷰 부분 수정 요청 본문입니다."""

    rating: int | None = Field(default=None, ge=1, le=5)
    tags: list[str] | None = None
    comment: str | None = None
    image_url: str | None = None


class ReviewRead(ReviewCreate):
    """리뷰 API 응답 본문입니다."""

    id: int
    item_title: str
    created_at: str
