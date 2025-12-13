import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.db.mongodb import mongodb


@pytest.fixture(scope="session")
def client():
    """
    FastAPI test client.
    """
    with TestClient(app) as c:
        yield c


@pytest.fixture(autouse=True)
async def clear_test_db():
    """
    Clear database before each test.
    """
    if mongodb.db:
        await mongodb.db["users"].delete_many({})
        await mongodb.db["sweets"].delete_many({})
