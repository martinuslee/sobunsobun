.PHONY: help install frontend backend dev migrate seed lint build clean test-backend

help:
	@echo "make install       Install frontend/backend dependencies"
	@echo "make frontend      Run Next.js Turbopack dev server"
	@echo "make backend       Run FastAPI dev server"
	@echo "make dev           Run frontend and backend together"
	@echo "make migrate       Run Alembic migrations"
	@echo "make seed          Insert mock group-buy items"
	@echo "make lint          Type-check frontend"
	@echo "make build         Build frontend"
	@echo "make clean         Remove frontend build caches"
	@echo "make test-backend  Run backend CRUD self-check"

install:
	npm --prefix frontend install
	python3 -m pip install -r backend/requirements.txt

frontend:
	npm --prefix frontend run dev

backend: migrate
	uvicorn backend.app.main:app --reload --host 0.0.0.0 --port 8000

dev:
	$(MAKE) -j2 frontend backend

migrate:
	alembic -c backend/alembic.ini upgrade head

seed:
	python3 -m backend.app.seed

lint:
	npm --prefix frontend run lint

build:
	npm --prefix frontend run build

clean:
	rm -rf frontend/.next frontend/tsconfig.tsbuildinfo

test-backend:
	python3 -c "from backend.app.test_main import test_group_buy_item_crud; test_group_buy_item_crud(); print('ok')"
