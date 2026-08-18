from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from backend.app.api.routes.items import get_or_create_user, item_or_404
from backend.app.db.session import get_db
from backend.app.models import ChatMessage
from backend.app.schemas import ChatMessageCreate, ChatMessageRead, ChatMessageUpdate, LocationInfo

router = APIRouter(prefix="/chat-messages", tags=["chat_messages"])


def serialize(message: ChatMessage) -> dict[str, Any]:
    """채팅 메시지를 프론트엔드 형태로 변환합니다."""

    location_info = None
    if message.location_name:
        location_info = LocationInfo(name=message.location_name, detail=message.location_detail or "")

    return {
        "id": message.id,
        "item_id": message.item_id,
        "sender_name": message.sender.nickname,
        "avatar": message.sender.avatar,
        "text": message.text,
        "type": message.type,
        "location_info": location_info,
        "time": message.display_time,
        "date": message.display_date,
    }


def message_or_404(db: Session, message_id: int) -> ChatMessage:
    """채팅 메시지를 조회하거나 404 응답을 발생시킵니다."""

    message = db.get(ChatMessage, message_id)
    if message is None:
        raise HTTPException(status_code=404, detail="Message not found")
    return message


@router.get("", response_model=list[ChatMessageRead])
def list_messages(item_id: int | None = None, db: Session = Depends(get_db)) -> list[dict[str, Any]]:
    """채팅 메시지를 오래된 순으로 조회합니다."""

    stmt = select(ChatMessage).order_by(ChatMessage.id)
    if item_id is not None:
        stmt = stmt.where(ChatMessage.item_id == item_id)
    return [serialize(message) for message in db.scalars(stmt).all()]


@router.post("", response_model=ChatMessageRead, status_code=201)
def create_message(payload: ChatMessageCreate, db: Session = Depends(get_db)) -> dict[str, Any]:
    """채팅 메시지를 생성합니다."""

    item_or_404(db, payload.item_id)
    sender = get_or_create_user(db, payload.sender_name, payload.avatar, 36.5)
    message = ChatMessage(
        item_id=payload.item_id,
        sender=sender,
        type=payload.type,
        text=payload.text,
        location_name=payload.location_info.name if payload.location_info else None,
        location_detail=payload.location_info.detail if payload.location_info else None,
        display_time=payload.time,
        display_date=payload.date,
    )
    db.add(message)
    db.commit()
    db.refresh(message)
    return serialize(message)


@router.patch("/{message_id}", response_model=ChatMessageRead)
def update_message(message_id: int, payload: ChatMessageUpdate, db: Session = Depends(get_db)) -> dict[str, Any]:
    """채팅 메시지를 부분 수정합니다."""

    message = message_or_404(db, message_id)
    data = payload.model_dump(exclude_unset=True)
    if "time" in data:
        message.display_time = data.pop("time")
    if "date" in data:
        message.display_date = data.pop("date")
    for key, value in data.items():
        setattr(message, key, value)
    db.commit()
    db.refresh(message)
    return serialize(message)


@router.delete("/{message_id}", status_code=204)
def delete_message(message_id: int, db: Session = Depends(get_db)) -> None:
    """채팅 메시지를 삭제합니다."""

    db.delete(message_or_404(db, message_id))
    db.commit()
