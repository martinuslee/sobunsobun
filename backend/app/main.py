from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.api.routes.chat_messages import router as chat_messages_router
from backend.app.api.routes.items import router as items_router
from backend.app.api.routes.notifications import router as notifications_router
from backend.app.api.routes.reviews import router as reviews_router
from backend.app.api.routes.users import router as users_router

app = FastAPI(title="sobunsobun API")
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"http://(localhost|127\.0\.0\.1):\d+",
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(items_router)
app.include_router(chat_messages_router)
app.include_router(notifications_router)
app.include_router(reviews_router)
app.include_router(users_router)


@app.get("/health")
def health() -> dict[str, str]:
    """API 생존 상태를 반환합니다."""

    return {"status": "ok"}
