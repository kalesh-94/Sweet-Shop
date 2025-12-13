from app.db.mongodb import user_collection


async def get_user_by_email(email: str):
    """
    Fetch a user by email.
    """
    collection = user_collection()
    return await collection.find_one({"email": email})


async def create_user(user_data: dict):
    """
    Create a new user.
    """
    collection = user_collection()
    await collection.insert_one(user_data)


async def user_exists(email: str) -> bool:
    """
    Check if a user already exists.
    """
    collection = user_collection()
    user = await collection.find_one({"email": email})
    return user is not None
