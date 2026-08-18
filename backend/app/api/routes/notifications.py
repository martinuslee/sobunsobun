from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from .items import get_or_create_user
from ...db.session import get_db
from ...models import Notification
from ...schemas import NotificationCreate, NotificationRead, NotificationUpdate

router = APIRouter(prefix="/notifications", tags=["notifications"])


def serialize(notification: Notification) -> dict[str, Any]:
    """알림 모델을 API 응답 형태로 변환합니다."""

    return {
        "id": notification.id,
        "recipient_name": notification.recipient.nickname,
        "title": notification.title,
        "content": notification.content,
        "time_ago": notification.time_ago,
        "type": notification.type,
        "read": notification.read,
        "target_screen": notification.target_screen,
    }


def notification_or_404(db: Session, notification_id: int) -> Notification:
    """알림을 조회하거나 404 응답을 발생시킵니다."""

    notification = db.get(Notification, notification_id)
    if notification is None:
        raise HTTPException(status_code=404, detail="Notification not found")
    return notification


@router.get("", response_model=list[NotificationRead])
def list_notifications(db: Session = Depends(get_db)) -> list[dict[str, Any]]:
    """알림을 최신순으로 조회합니다."""

    rows = db.scalars(select(Notification).order_by(Notification.id.desc())).all()
    return [serialize(row) for row in rows]


@router.post("", response_model=NotificationRead, status_code=201)
def create_notification(payload: NotificationCreate, db: Session = Depends(get_db)) -> dict[str, Any]:
    """알림을 생성합니다."""

    recipient = get_or_create_user(db, payload.recipient_name, None, 36.5)
    notification = Notification(
        recipient=recipient,
        title=payload.title,
        content=payload.content,
        time_ago=payload.time_ago,
        type=payload.type,
        read=payload.read,
        target_screen=payload.target_screen,
    )
    db.add(notification)
    db.commit()
    db.refresh(notification)
    return serialize(notification)


@router.patch("/{notification_id}", response_model=NotificationRead)
def update_notification(
    notification_id: int,
    payload: NotificationUpdate,
    db: Session = Depends(get_db),
) -> dict[str, Any]:
    """알림을 부분 수정합니다."""

    notification = notification_or_404(db, notification_id)
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(notification, key, value)
    db.commit()
    db.refresh(notification)
    return serialize(notification)


@router.delete("/{notification_id}", status_code=204)
def delete_notification(notification_id: int, db: Session = Depends(get_db)) -> None:
    """알림을 삭제합니다."""

    db.delete(notification_or_404(db, notification_id))
    db.commit()
