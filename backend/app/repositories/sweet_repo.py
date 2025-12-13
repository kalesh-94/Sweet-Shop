from bson import ObjectId
from app.db.mongodb import sweet_collection


def serialize_sweet(sweet: dict) -> dict:
    """
    Convert MongoDB document to JSON-serializable dict.
    """
    sweet["_id"] = str(sweet["_id"])
    return sweet


async def get_all_sweets():
    """
    Fetch all sweets.
    """
    collection = sweet_collection()
    sweets = []

    async for sweet in collection.find():
        sweets.append(serialize_sweet(sweet))

    return sweets


async def search_sweets(query: str = None, min_price=None, max_price=None):
    """
    Search sweets by name/category and price range.
    """
    collection = sweet_collection()
    filters = {}

    if query:
        filters["$or"] = [
            {"name": {"$regex": query, "$options": "i"}},
            {"category": {"$regex": query, "$options": "i"}},
        ]

    if min_price is not None or max_price is not None:
        filters["price"] = {}
        if min_price is not None:
            filters["price"]["$gte"] = min_price
        if max_price is not None:
            filters["price"]["$lte"] = max_price

    sweets = []
    async for sweet in collection.find(filters):
        sweets.append(serialize_sweet(sweet))

    return sweets


async def create_sweet(data: dict):
    """
    Create a new sweet.
    """
    collection = sweet_collection()
    await collection.insert_one(data)


async def update_sweet(sweet_id: str, data: dict) -> bool:
    """
    Update a sweet by ID.
    """
    collection = sweet_collection()
    result = await collection.update_one(
        {"_id": ObjectId(sweet_id)},
        {"$set": data},
    )
    return result.matched_count > 0


async def delete_sweet(sweet_id: str) -> bool:
    """
    Delete a sweet by ID.
    """
    collection = sweet_collection()
    result = await collection.delete_one({"_id": ObjectId(sweet_id)})
    return result.deleted_count > 0
