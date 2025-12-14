from pydantic import BaseModel, EmailStr, Field
from typing import Optional


class UserModel(BaseModel):
    """
    Internal User model representation.
    Used when interacting with MongoDB.
    """
    email: EmailStr
    password: str
    role: str = Field(default="user")

    class Config:
        orm_mode = True

