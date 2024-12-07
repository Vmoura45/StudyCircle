from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class StudyMaterialBase(BaseModel):
    title: str
    description: str
    content: str
    subject: str
    teacher_id: str
    price: float
    is_published: bool = False

class StudyMaterialCreate(StudyMaterialBase):
    pass

class StudyMaterial(StudyMaterialBase):
    id: str
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True
