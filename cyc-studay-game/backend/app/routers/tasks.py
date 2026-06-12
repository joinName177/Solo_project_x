import sqlite3

from fastapi import APIRouter, Depends, HTTPException

from app.main import get_db
from app.services import task_service

router = APIRouter(tags=["tasks"])


@router.get("/tasks")
def list_tasks(db: sqlite3.Connection = Depends(get_db)):
    return task_service.get_all_tasks_with_sticker_status(db)


@router.get("/tasks/today")
def today_task(db: sqlite3.Connection = Depends(get_db)):
    task = task_service.get_today_task(db)
    if not task:
        raise HTTPException(status_code=404, detail="今日无任务")
    return task


@router.get("/tasks/{task_id}")
def get_task(task_id: int, db: sqlite3.Connection = Depends(get_db)):
    task = task_service.get_task_by_id(db, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="任务不存在")
    return task
