"""chat notifications reviews

Revision ID: 20260818_0002
Revises: 20260818_0001
Create Date: 2026-08-18
"""
from alembic import op
import sqlalchemy as sa

revision = "20260818_0002"
down_revision = "20260818_0001"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "tags",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=80), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_tags_name"), "tags", ["name"], unique=True)

    op.create_table(
        "chat_messages",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("item_id", sa.Integer(), nullable=False),
        sa.Column("sender_id", sa.Integer(), nullable=False),
        sa.Column("type", sa.String(length=32), nullable=False),
        sa.Column("text", sa.Text(), nullable=True),
        sa.Column("location_name", sa.String(length=200), nullable=True),
        sa.Column("location_detail", sa.String(length=200), nullable=True),
        sa.Column("display_time", sa.String(length=40), nullable=False),
        sa.Column("display_date", sa.String(length=80), nullable=True),
        sa.Column("created_at", sa.DateTime(), server_default=sa.func.now(), nullable=False),
        sa.CheckConstraint("type IN ('text', 'location_proposal', 'image', 'qr')"),
        sa.ForeignKeyConstraint(["item_id"], ["group_buy_items.id"]),
        sa.ForeignKeyConstraint(["sender_id"], ["users.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_chat_messages_item_id"), "chat_messages", ["item_id"])
    op.create_index(op.f("ix_chat_messages_sender_id"), "chat_messages", ["sender_id"])

    op.create_table(
        "notifications",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("recipient_id", sa.Integer(), nullable=False),
        sa.Column("title", sa.String(length=120), nullable=False),
        sa.Column("content", sa.Text(), nullable=False),
        sa.Column("type", sa.String(length=32), nullable=False),
        sa.Column("read", sa.Boolean(), nullable=False),
        sa.Column("target_screen", sa.String(length=40), nullable=True),
        sa.Column("time_ago", sa.String(length=40), nullable=False),
        sa.Column("created_at", sa.DateTime(), server_default=sa.func.now(), nullable=False),
        sa.CheckConstraint("type IN ('group_buy', 'chat', 'keyword', 'review')"),
        sa.ForeignKeyConstraint(["recipient_id"], ["users.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_notifications_recipient_id"), "notifications", ["recipient_id"])

    op.create_table(
        "reviews",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("item_id", sa.Integer(), nullable=False),
        sa.Column("reviewer_id", sa.Integer(), nullable=False),
        sa.Column("host_id", sa.Integer(), nullable=False),
        sa.Column("rating", sa.Integer(), nullable=False),
        sa.Column("comment", sa.Text(), nullable=False),
        sa.Column("image_url", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(), server_default=sa.func.now(), nullable=False),
        sa.CheckConstraint("rating >= 1"),
        sa.CheckConstraint("rating <= 5"),
        sa.ForeignKeyConstraint(["host_id"], ["users.id"]),
        sa.ForeignKeyConstraint(["item_id"], ["group_buy_items.id"]),
        sa.ForeignKeyConstraint(["reviewer_id"], ["users.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_reviews_host_id"), "reviews", ["host_id"])
    op.create_index(op.f("ix_reviews_item_id"), "reviews", ["item_id"])
    op.create_index(op.f("ix_reviews_reviewer_id"), "reviews", ["reviewer_id"])

    op.create_table(
        "review_tags",
        sa.Column("review_id", sa.Integer(), nullable=False),
        sa.Column("tag_id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(["review_id"], ["reviews.id"]),
        sa.ForeignKeyConstraint(["tag_id"], ["tags.id"]),
        sa.PrimaryKeyConstraint("review_id", "tag_id"),
    )


def downgrade() -> None:
    op.drop_table("review_tags")
    op.drop_index(op.f("ix_reviews_reviewer_id"), table_name="reviews")
    op.drop_index(op.f("ix_reviews_item_id"), table_name="reviews")
    op.drop_index(op.f("ix_reviews_host_id"), table_name="reviews")
    op.drop_table("reviews")
    op.drop_index(op.f("ix_notifications_recipient_id"), table_name="notifications")
    op.drop_table("notifications")
    op.drop_index(op.f("ix_chat_messages_sender_id"), table_name="chat_messages")
    op.drop_index(op.f("ix_chat_messages_item_id"), table_name="chat_messages")
    op.drop_table("chat_messages")
    op.drop_index(op.f("ix_tags_name"), table_name="tags")
    op.drop_table("tags")
