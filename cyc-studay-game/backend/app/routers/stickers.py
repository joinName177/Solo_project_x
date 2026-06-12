import sqlite3

from fastapi import APIRouter, Depends, HTTPException

from app.main import get_db
from app.services import sticker_service

router = APIRouter(tags=["stickers"])


@router.get("/stickers")
def list_stickers(date: str, db: sqlite3.Connection = Depends(get_db)):
    return sticker_service.get_stickers_by_date(db, date)


@router.get("/stickers/total")
def total_stickers(db: sqlite3.Connection = Depends(get_db)):
    return {"total": sticker_service.get_total(db)}


@router.post("/stickers")
def add_sticker(task_id: int, db: sqlite3.Connection = Depends(get_db)):
    try:
        return sticker_service.add_sticker(db, task_id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.delete("/stickers/{sticker_id}")
def remove_sticker(sticker_id: int, db: sqlite3.Connection = Depends(get_db)):
    return sticker_service.remove_sticker(db, sticker_id)


@router.get("/level")
def get_level(db: sqlite3.Connection = Depends(get_db)):
    return sticker_service.get_level_info(db)
