from pydantic import BaseModel
from typing import Optional


class ParentRecord(BaseModel):
    task_id: int
    date: str
    hardest: Optional[str] = None
    happiest: Optional[str] = None


class ParentRecordOut(ParentRecord):
    id: int
    created_at: str
