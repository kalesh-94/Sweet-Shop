from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings


class MongoDB:
    """
    MongoDB connection handler using Motor (async).
    """

    client: AsyncIOMotorClient = None
    db = None


mongodb = MongoDB()


async def connect_to_mongo():
    """
    Create MongoDB connection.
    Called on FastAPI startup.
    """
    mongodb.client = AsyncIOMotorClient(settings.MONGO_URI)
    mongodb.db = mongodb.client[settings.DATABASE_NAME]


async def close_mongo_connection():
    """
    Close MongoDB connection.
    Called on FastAPI shutdown.
    """
    mongodb.client.close()


def get_database():
    """
    Get database instance.
    """
    return mongodb.db


# Collections
def user_collection():
    return get_database()["users"]


def sweet_collection():
    return get_database()["sweets"]
