import sqlite3

from fastapi import APIRouter, Depends

from app.main import get_db
from app.models.record import ParentRecord
from app.services import record_service

router = APIRouter(tags=["records"])


@router.get("/records")
def get_record(date: str = None, db: sqlite3.Connection = Depends(get_db)):
    if date:
        return record_service.get_record_by_date(db, date)
    return []


@router.get("/records/week")
def week_records(db: sqlite3.Connection = Depends(get_db)):
    return record_service.get_week_records(db)


@router.post("/records")
def save_record(body: ParentRecord, db: sqlite3.Connection = Depends(get_db)):
    record_id = record_service.save_record(
        db, body.task_id, body.hardest or "", body.happiest or ""
    )
    return {"id": record_id}
