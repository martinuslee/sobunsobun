from sqlalchemy import Boolean, CheckConstraint, Column, Float, ForeignKey, Integer, String, Table, Text, UniqueConstraint, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql.sqltypes import DateTime

from .db.base import Base


class User(Base):
    """공동구매 모집글을 작성하는 사용자 프로필입니다."""

    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    nickname: Mapped[str] = mapped_column(String(80), unique=True, nullable=False, index=True)
    email: Mapped[str | None] = mapped_column(String(255), unique=True, index=True)
    password_hash: Mapped[str | None] = mapped_column(String(255))
    avatar: Mapped[str | None] = mapped_column(String(32))
    manner_temp: Mapped[float] = mapped_column(Float, nullable=False, default=36.5)
    created_at = mapped_column(DateTime, server_default=func.now(), nullable=False)

    items = relationship("GroupBuyItem", back_populates="host")
    chat_messages = relationship("ChatMessage", back_populates="sender")
    received_notifications = relationship("Notification", back_populates="recipient")


class Category(Base):
    """대분류와 소분류를 표현하는 계층형 카테고리입니다."""

    __tablename__ = "categories"
    __table_args__ = (UniqueConstraint("name", "parent_id"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(80), nullable=False)
    parent_id: Mapped[int | None] = mapped_column(ForeignKey("categories.id"))

    parent = relationship("Category", remote_side=[id])
    items = relationship("GroupBuyItem", back_populates="category")


class Location(Base):
    """공동구매 모집글에 연결되는 동네 또는 지역입니다."""

    __tablename__ = "locations"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(120), unique=True, nullable=False, index=True)
    created_at = mapped_column(DateTime, server_default=func.now(), nullable=False)

    items = relationship("GroupBuyItem", back_populates="location")


class GroupBuyItem(Base):
    """작성자, 카테고리, 지역을 정규화해 연결한 공동구매 모집글입니다."""

    __tablename__ = "group_buy_items"
    __table_args__ = (
        CheckConstraint("total_price > 0"),
        CheckConstraint("total_members >= 2"),
        CheckConstraint("current_members >= 1"),
        CheckConstraint("current_members <= total_members"),
        CheckConstraint("status IN ('recruiting', 'completed', 'canceled')"),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    category_id: Mapped[int] = mapped_column(ForeignKey("categories.id"), nullable=False, index=True)
    location_id: Mapped[int] = mapped_column(ForeignKey("locations.id"), nullable=False, index=True)
    host_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False, index=True)
    distance: Mapped[str] = mapped_column(String(40), nullable=False, default="300m")
    total_price: Mapped[int] = mapped_column(Integer, nullable=False)
    total_members: Mapped[int] = mapped_column(Integer, nullable=False)
    current_members: Mapped[int] = mapped_column(Integer, nullable=False, default=1)
    unit: Mapped[str | None] = mapped_column(String(80))
    image_url: Mapped[str] = mapped_column(Text, nullable=False)
    urgent: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    meeting_place: Mapped[str] = mapped_column(String(200), nullable=False)
    meeting_place_detail: Mapped[str] = mapped_column(String(200), nullable=False, default="")
    description: Mapped[str] = mapped_column(Text, nullable=False, default="")
    deadline: Mapped[str] = mapped_column(String(80), nullable=False, default="")
    is_liked: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    status: Mapped[str] = mapped_column(String(20), nullable=False, default="recruiting")
    created_at = mapped_column(DateTime, server_default=func.now(), nullable=False)
    updated_at = mapped_column(DateTime, server_default=func.now(), onupdate=func.now(), nullable=False)

    category = relationship("Category", back_populates="items")
    location = relationship("Location", back_populates="items")
    host = relationship("User", back_populates="items")
    chat_messages = relationship("ChatMessage", back_populates="item", cascade="all, delete-orphan")
    reviews = relationship("Review", back_populates="item", cascade="all, delete-orphan")


review_tags = Table(
    "review_tags",
    Base.metadata,
    Column("review_id", ForeignKey("reviews.id"), primary_key=True),
    Column("tag_id", ForeignKey("tags.id"), primary_key=True),
)


class ChatMessage(Base):
    """모집글별 1:1 채팅 메시지입니다."""

    __tablename__ = "chat_messages"
    __table_args__ = (CheckConstraint("type IN ('text', 'location_proposal', 'image', 'qr')"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    item_id: Mapped[int] = mapped_column(ForeignKey("group_buy_items.id"), nullable=False, index=True)
    sender_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False, index=True)
    type: Mapped[str] = mapped_column(String(32), nullable=False, default="text")
    text: Mapped[str | None] = mapped_column(Text)
    location_name: Mapped[str | None] = mapped_column(String(200))
    location_detail: Mapped[str | None] = mapped_column(String(200))
    display_time: Mapped[str] = mapped_column(String(40), nullable=False, default="방금")
    display_date: Mapped[str | None] = mapped_column(String(80))
    created_at = mapped_column(DateTime, server_default=func.now(), nullable=False)

    item = relationship("GroupBuyItem", back_populates="chat_messages")
    sender = relationship("User", back_populates="chat_messages")


class Notification(Base):
    """사용자에게 보여줄 알림입니다."""

    __tablename__ = "notifications"
    __table_args__ = (CheckConstraint("type IN ('group_buy', 'chat', 'keyword', 'review')"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    recipient_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False, index=True)
    title: Mapped[str] = mapped_column(String(120), nullable=False)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    type: Mapped[str] = mapped_column(String(32), nullable=False)
    read: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    target_screen: Mapped[str | None] = mapped_column(String(40))
    time_ago: Mapped[str] = mapped_column(String(40), nullable=False, default="방금")
    created_at = mapped_column(DateTime, server_default=func.now(), nullable=False)

    recipient = relationship("User", back_populates="received_notifications")


class Tag(Base):
    """리뷰에 재사용되는 태그입니다."""

    __tablename__ = "tags"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(80), unique=True, nullable=False, index=True)
    reviews = relationship("Review", secondary=review_tags, back_populates="tags")


class Review(Base):
    """공동구매 완료 후 작성되는 리뷰입니다."""

    __tablename__ = "reviews"
    __table_args__ = (
        CheckConstraint("rating >= 1"),
        CheckConstraint("rating <= 5"),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    item_id: Mapped[int] = mapped_column(ForeignKey("group_buy_items.id"), nullable=False, index=True)
    reviewer_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False, index=True)
    host_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False, index=True)
    rating: Mapped[int] = mapped_column(Integer, nullable=False)
    comment: Mapped[str] = mapped_column(Text, nullable=False, default="")
    image_url: Mapped[str | None] = mapped_column(Text)
    created_at = mapped_column(DateTime, server_default=func.now(), nullable=False)

    item = relationship("GroupBuyItem", back_populates="reviews")
    reviewer = relationship("User", foreign_keys=[reviewer_id])
    host = relationship("User", foreign_keys=[host_id])
    tags = relationship("Tag", secondary=review_tags, back_populates="reviews")
