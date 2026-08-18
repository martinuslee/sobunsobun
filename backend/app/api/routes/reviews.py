from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from .items import get_or_create_user, item_or_404
from ...db.session import get_db
from ...models import Review, Tag
from ...schemas import ReviewCreate, ReviewRead, ReviewUpdate

router = APIRouter(prefix="/reviews", tags=["reviews"])


def get_or_create_tag(db: Session, name: str) -> Tag:
    """기존 리뷰 태그를 반환하거나 새로 생성합니다."""

    tag = db.scalar(select(Tag).where(Tag.name == name))
    if tag:
        return tag
    tag = Tag(name=name)
    db.add(tag)
    db.flush()
    return tag


def serialize(review: Review) -> dict[str, Any]:
    """리뷰 모델을 API 응답 형태로 변환합니다."""

    return {
        "id": review.id,
        "item_id": review.item_id,
        "item_title": review.item.title,
        "reviewer_name": review.reviewer.nickname,
        "host_name": review.host.nickname,
        "rating": review.rating,
        "tags": [tag.name for tag in review.tags],
        "comment": review.comment,
        "image_url": review.image_url,
        "created_at": str(review.created_at),
    }


def review_or_404(db: Session, review_id: int) -> Review:
    """리뷰를 조회하거나 404 응답을 발생시킵니다."""

    review = db.get(Review, review_id)
    if review is None:
        raise HTTPException(status_code=404, detail="Review not found")
    return review


@router.get("", response_model=list[ReviewRead])
def list_reviews(item_id: int | None = None, db: Session = Depends(get_db)) -> list[dict[str, Any]]:
    """리뷰를 최신순으로 조회합니다."""

    stmt = select(Review).order_by(Review.id.desc())
    if item_id is not None:
        stmt = stmt.where(Review.item_id == item_id)
    return [serialize(review) for review in db.scalars(stmt).all()]


@router.post("", response_model=ReviewRead, status_code=201)
def create_review(payload: ReviewCreate, db: Session = Depends(get_db)) -> dict[str, Any]:
    """리뷰를 생성합니다."""

    item = item_or_404(db, payload.item_id)
    reviewer = get_or_create_user(db, payload.reviewer_name, None, 36.5)
    host = get_or_create_user(db, payload.host_name, None, 36.5)
    review = Review(
        item=item,
        reviewer=reviewer,
        host=host,
        rating=payload.rating,
        comment=payload.comment,
        image_url=payload.image_url,
        tags=[get_or_create_tag(db, tag) for tag in payload.tags],
    )
    db.add(review)
    db.commit()
    db.refresh(review)
    return serialize(review)


@router.patch("/{review_id}", response_model=ReviewRead)
def update_review(review_id: int, payload: ReviewUpdate, db: Session = Depends(get_db)) -> dict[str, Any]:
    """리뷰를 부분 수정합니다."""

    review = review_or_404(db, review_id)
    data = payload.model_dump(exclude_unset=True)
    if "tags" in data:
        review.tags = [get_or_create_tag(db, tag) for tag in data.pop("tags")]
    for key, value in data.items():
        setattr(review, key, value)
    db.commit()
    db.refresh(review)
    return serialize(review)


@router.delete("/{review_id}", status_code=204)
def delete_review(review_id: int, db: Session = Depends(get_db)) -> None:
    """리뷰를 삭제합니다."""

    db.delete(review_or_404(db, review_id))
    db.commit()
