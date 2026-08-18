"""user signup fields

Revision ID: 20260818_0003
Revises: 20260818_0002
Create Date: 2026-08-18
"""
from alembic import op
import sqlalchemy as sa

revision = "20260818_0003"
down_revision = "20260818_0002"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column("users", sa.Column("email", sa.String(length=255), nullable=True))
    op.add_column("users", sa.Column("password_hash", sa.String(length=255), nullable=True))
    op.create_index(op.f("ix_users_email"), "users", ["email"], unique=True)


def downgrade() -> None:
    op.drop_index(op.f("ix_users_email"), table_name="users")
    op.drop_column("users", "password_hash")
    op.drop_column("users", "email")
