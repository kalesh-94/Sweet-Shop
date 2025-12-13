from fastapi import APIRouter

from app.api.routes import auth, sweets

api_router = APIRouter()

# Auth routes
api_router.include_router(
    auth.router,
    prefix="/auth",
    tags=["Auth"]
)

# Sweets & Inventory routes
api_router.include_router(
    sweets.router,
    prefix="/sweets",
    tags=["Sweets"]
)
