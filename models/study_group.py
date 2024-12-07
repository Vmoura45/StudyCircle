from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel


class StudyGroup(BaseModel):
    id: str
    name: str
    description: str
    creator_id: str
    created_at: datetime
    members: List[str] = []  # Lista de IDs dos membros do grupo
    topics: List[str] = []  # Lista de tópicos associados ao grupo
    is_private: bool = False  # Indica se o grupo é privado ou público
