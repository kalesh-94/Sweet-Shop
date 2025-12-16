from pydantic import BaseModel, Field
from enum import Enum



class SweetCategory(str, Enum):
    chocolate = "chocolate"
    gummy = "gummy"
    candy = "candy"
    mithai = "mithai"
    pastry = "pastry"

class SweetModel(BaseModel):
    """
    Internal Sweet model representation.
    Used for MongoDB documents.
    """
    name: str = Field(..., min_length=1)
    description: str
    category: SweetCategory
    price: float = Field(..., gt=0)
    quantity: int = Field(..., ge=0)
    imgurl: str

    class Config:
        orm_mode = True
