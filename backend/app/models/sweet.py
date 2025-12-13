from pydantic import BaseModel, Field


class SweetModel(BaseModel):
    """
    Internal Sweet model representation.
    Used for MongoDB documents.
    """
    name: str = Field(..., min_length=1)
    description: str
    category: str = Field(..., min_length=1)
    price: float = Field(..., gt=0)
    quantity: int = Field(..., ge=0)
    imgurl: str

    class Config:
        orm_mode = True
