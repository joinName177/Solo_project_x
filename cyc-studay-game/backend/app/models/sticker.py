from pydantic import BaseModel
from typing import Optional


class StickerRecord(BaseModel):
    id: Optional[int] = None
    task_id: int
    round: int
    date: str


class StickerRecordOut(StickerRecord):
    id: int
    created_at: str
