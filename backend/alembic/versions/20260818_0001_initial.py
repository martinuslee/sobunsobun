"""initial normalized schema

Revision ID: 20260818_0001
Revises:
Create Date: 2026-08-18
"""
from alembic import op
import sqlalchemy as sa

revision = "20260818_0001"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("nickname", sa.String(length=80), nullable=False),
        sa.Column("avatar", sa.String(length=32), nullable=True),
        sa.Column("manner_temp", sa.Float(), nullable=False),
        sa.Column("created_at", sa.DateTime(), server_default=sa.func.now(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_users_nickname"), "users", ["nickname"], unique=True)

    op.create_table(
        "categories",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=80), nullable=False),
        sa.Column("parent_id", sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(["parent_id"], ["categories.id"]),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("name", "parent_id"),
    )

    op.create_table(
        "locations",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=120), nullable=False),
        sa.Column("created_at", sa.DateTime(), server_default=sa.func.now(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_locations_name"), "locations", ["name"], unique=True)

    op.create_table(
        "group_buy_items",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("title", sa.String(length=200), nullable=False),
        sa.Column("category_id", sa.Integer(), nullable=False),
        sa.Column("location_id", sa.Integer(), nullable=False),
        sa.Column("host_id", sa.Integer(), nullable=False),
        sa.Column("distance", sa.String(length=40), nullable=False),
        sa.Column("total_price", sa.Integer(), nullable=False),
        sa.Column("total_members", sa.Integer(), nullable=False),
        sa.Column("current_members", sa.Integer(), nullable=False),
        sa.Column("unit", sa.String(length=80), nullable=True),
        sa.Column("image_url", sa.Text(), nullable=False),
        sa.Column("urgent", sa.Boolean(), nullable=False),
        sa.Column("meeting_place", sa.String(length=200), nullable=False),
        sa.Column("meeting_place_detail", sa.String(length=200), nullable=False),
        sa.Column("description", sa.Text(), nullable=False),
        sa.Column("deadline", sa.String(length=80), nullable=False),
        sa.Column("is_liked", sa.Boolean(), nullable=False),
        sa.Column("status", sa.String(length=20), nullable=False),
        sa.Column("created_at", sa.DateTime(), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), server_default=sa.func.now(), nullable=False),
        sa.CheckConstraint("current_members >= 1"),
        sa.CheckConstraint("current_members <= total_members"),
        sa.CheckConstraint("status IN ('recruiting', 'completed', 'canceled')"),
        sa.CheckConstraint("total_members >= 2"),
        sa.CheckConstraint("total_price > 0"),
        sa.ForeignKeyConstraint(["category_id"], ["categories.id"]),
        sa.ForeignKeyConstraint(["host_id"], ["users.id"]),
        sa.ForeignKeyConstraint(["location_id"], ["locations.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_group_buy_items_category_id"), "group_buy_items", ["category_id"])
    op.create_index(op.f("ix_group_buy_items_host_id"), "group_buy_items", ["host_id"])
    op.create_index(op.f("ix_group_buy_items_location_id"), "group_buy_items", ["location_id"])


def downgrade() -> None:
    op.drop_index(op.f("ix_group_buy_items_location_id"), table_name="group_buy_items")
    op.drop_index(op.f("ix_group_buy_items_host_id"), table_name="group_buy_items")
    op.drop_index(op.f("ix_group_buy_items_category_id"), table_name="group_buy_items")
    op.drop_table("group_buy_items")
    op.drop_index(op.f("ix_locations_name"), table_name="locations")
    op.drop_table("locations")
    op.drop_table("categories")
    op.drop_index(op.f("ix_users_nickname"), table_name="users")
    op.drop_table("users")
