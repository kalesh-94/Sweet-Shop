import pytest
from fastapi.testclient import TestClient
import asyncio

from app.main import app
from app.db.mongodb import mongodb


@pytest.fixture(scope="session")
def client():
    with TestClient(app) as c:
        yield c


@pytest.fixture(autouse=True)
def clear_test_db():
    """
    Clear database before each test (sync-safe).
    """
    if mongodb.db is None:
        return

    loop = asyncio.get_event_loop()
    loop.run_until_complete(mongodb.db["users"].delete_many({}))
    loop.run_until_complete(mongodb.db["sweets"].delete_many({}))
