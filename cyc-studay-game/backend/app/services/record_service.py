import sqlite3
from datetime import date

from app.repositories import record_repo


def get_record_by_date(db: sqlite3.Connection, date_str: str):
    return record_repo.get_by_date(db, date_str)


def get_week_records(db: sqlite3.Connection):
    return record_repo.get_week_records(db)


def save_record(db: sqlite3.Connection, task_id: int, hardest: str, happiest: str):
    today = date.today().isoformat()
    return record_repo.upsert(db, task_id, today, hardest or "", happiest or "")
