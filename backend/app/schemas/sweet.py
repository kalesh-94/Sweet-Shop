from pydantic import BaseModel, Field


class SweetCreate(BaseModel):
    name: str = Field(..., min_length=1)
    description: str  
    price: float = Field(..., gt=0)
    quantity: int = Field(..., ge=0)
    category: str = Field(..., min_length=1)
    imgurl: str


class SweetUpdate(BaseModel):
    name: str = Field(..., min_length=1)
    description: str
    price: float = Field(..., gt=0)
    quantity: int = Field(..., ge=0)
    category: str = Field(..., min_length=1)
    imgurl: str
