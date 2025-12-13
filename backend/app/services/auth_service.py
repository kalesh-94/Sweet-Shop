from app.repositories.user_repo import (
    get_user_by_email,
    create_user,
    user_exists,
)
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
)


async def register_user(name:str, email: str, password: str):
    """
    Register a new user and return (token, user).
    """
    if await user_exists(email):
        return None

    user_data = {
        "name": name ,
        "email": email,
        "password": hash_password(password),
        "role": "user",
    }

    await create_user(user_data)

    token = create_access_token(subject=email)

    return token, {
        "name" : name,
        "email": email,
        "role": "user",
    }


async def login_user(email: str, password: str):
    """
    Authenticate user and return (token, user).
    """
    user = await get_user_by_email(email)
    if not user:
        return None

    if not verify_password(password, user["password"]):
        return None

    token = create_access_token(subject=email)

    return token, {
        "email": user["email"],
        "role": user["role"],
    }
