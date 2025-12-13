from bson import ObjectId
from app.db.mongodb import sweet_collection


async def purchase_sweet(sweet_id: str, quantity: int) -> bool:
    """
    Purchase a sweet (decrease quantity).
    """
    collection = sweet_collection()

    sweet = await collection.find_one({"_id": ObjectId(sweet_id)})
    if not sweet:
        return False

    if sweet["quantity"] < quantity:
        return False

    await collection.update_one(
        {"_id": ObjectId(sweet_id)},
        {"$inc": {"quantity": -quantity}},
    )

    return True


async def restock_sweet(sweet_id: str, quantity: int):
    """
    Restock a sweet (increase quantity).
    """
    collection = sweet_collection()

    await collection.update_one(
        {"_id": ObjectId(sweet_id)},
        {"$inc": {"quantity": quantity}},
    )
