from app.repositories.sweet_repo import (
    get_all_sweets,
    search_sweets,
    create_sweet,
    update_sweet,
    delete_sweet,
)


async def list_sweets():
    """
    Return all sweets.
    """
    return await get_all_sweets()


async def search_sweets_service(query=None, min_price=None, max_price=None):
    """
    Search sweets by query and price range.
    """
    return await search_sweets(query, min_price, max_price)


async def create_sweet_service(data: dict):
    """
    Create a new sweet.
    """
    await create_sweet(data)


async def update_sweet_service(sweet_id: str, data: dict) -> bool:
    """
    Update a sweet.
    """
    return await update_sweet(sweet_id, data)


async def delete_sweet_service(sweet_id: str) -> bool:
    """
    Delete a sweet.
    """
    return await delete_sweet(sweet_id)
