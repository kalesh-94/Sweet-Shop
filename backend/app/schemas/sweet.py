from pydantic import BaseModel, Field
from enum import Enum



class SweetCategory(str, Enum):
    chocolate = "chocolate"
    gummy = "gummy"
    candy = "candy"
    mithai = "mithai"
    pastry = "pastry"

class SweetCreate(BaseModel):
    name: str = Field(..., min_length=1)
    description: str  
    price: float = Field(..., gt=0)
    quantity: int = Field(..., ge=0)
    category: SweetCategory
    imgurl: str


class SweetUpdate(BaseModel):
    name: str = Field(..., min_length=1)
    description: str
    price: float = Field(..., gt=0)
    quantity: int = Field(..., ge=0)
    category: str = Field(..., min_length=1)
    imgurl: str
