from fastapi import APIRouter, HTTPException, status
from app.schemas.auth import RegisterRequest, LoginRequest
from app.services.auth_service import register_user, login_user

router = APIRouter()


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(payload: RegisterRequest):
    """
    Register a new user.
    Returns JWT token and basic user info.
    """
    result = await register_user(payload.name, payload.email, payload.password)

    if not result:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already exists"
        )

    token, user = result
    return {
        "token": token,
        "user": {
            "name": user["name"],
            "email": user["email"],
            "role": user["role"]
        }
    }


@router.post("/login")
async def login(payload: LoginRequest):
    """
    Login an existing user.
    Returns JWT token and basic user info.
    """
    result = await login_user(payload.email, payload.password)

    if not result:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    token, user = result
    return {
        "token": token,
        "user": {
            "email": user["email"],
            "role": user["role"]
        }
    }
