import sqlite3
from datetime import date

from app.repositories import task_repo
from app.repositories import sticker_repo


def get_all_tasks(db: sqlite3.Connection):
    return task_repo.get_all_tasks(db)


def get_task_by_id(db: sqlite3.Connection, task_id: int):
    return task_repo.get_task_by_id(db, task_id)


def get_today_task(db: sqlite3.Connection):
    today_dow = date.today().isoweekday()
    return task_repo.get_today_task(db, today_dow)


def get_all_tasks_with_sticker_status(db: sqlite3.Connection):
    tasks = task_repo.get_all_tasks(db)
    today = date.today().isoformat()
    today_stickers = sticker_repo.get_by_date(db, today)
    sticker_map = {}
    for s in today_stickers:
        sticker_map[s["task_id"]] = sticker_map.get(s["task_id"], 0) + 1
    for t in tasks:
        t["today_rounds"] = sticker_map.get(t["id"], 0)
    return tasks
