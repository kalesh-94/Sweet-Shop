from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import Optional

from app.core.dependencies import get_current_user, admin_required
from app.schemas.sweet import SweetCreate, SweetUpdate
from app.repositories.sweet_repo import (
    get_all_sweets,
    search_sweets,
    create_sweet,
    update_sweet,
    delete_sweet,
)
from app.services.inventory_service import purchase_sweet, restock_sweet

router = APIRouter()


@router.get("/")
async def list_sweets(user=Depends(get_current_user)):
    """
    Get all available sweets (authenticated users).
    """
    return await get_all_sweets()


@router.get("/search")
async def search(
    q: Optional[str] = Query(None, description="Search by name or category"),
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    user=Depends(get_current_user),
):
    """
    Search sweets by name/category and optional price range.
    """
    return await search_sweets(q, min_price, max_price)


@router.post("/", status_code=status.HTTP_201_CREATED)
async def add_sweet(payload: SweetCreate, user=Depends(admin_required)):
    """
    Add a new sweet (admin only).
    """
    await create_sweet(payload.dict())
    return {"message": "Sweet added successfully"}


@router.put("/{sweet_id}")
async def edit_sweet(
    sweet_id: str,
    payload: SweetUpdate,
    user=Depends(admin_required),
):
    """
    Update sweet details (admin only).
    """
    updated = await update_sweet(sweet_id, payload.dict())
    if not updated:
        raise HTTPException(status_code=404, detail="Sweet not found")
    return {"message": "Sweet updated successfully"}


@router.delete("/{sweet_id}", status_code=status.HTTP_204_NO_CONTENT)
async def remove_sweet(sweet_id: str, user=Depends(admin_required)):
    """
    Delete a sweet (admin only).
    """
    deleted = await delete_sweet(sweet_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Sweet not found")
    return None


@router.post("/{sweet_id}/purchase")
async def purchase(
    sweet_id: str,
    quantity: int = Query(1, gt=0),
    user=Depends(get_current_user),
):
    """
    Purchase a sweet (decreases quantity).
    """
    success = await purchase_sweet(sweet_id, quantity)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Insufficient stock or sweet not found",
        )
    return {"message": "Purchase successful"}


@router.post("/{sweet_id}/restock")
async def restock(
    sweet_id: str,
    quantity: int = Query(..., gt=0),
    user=Depends(admin_required),
):
    """
    Restock a sweet (admin only).
    """
    await restock_sweet(sweet_id, quantity)
    return {"message": "Sweet restocked successfully"}
