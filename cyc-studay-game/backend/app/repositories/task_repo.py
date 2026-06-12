import sqlite3


def get_all_tasks(db: sqlite3.Connection):
    rows = db.execute("SELECT * FROM task_card ORDER BY day_of_week").fetchall()
    return [dict(r) for r in rows]


def get_task_by_id(db: sqlite3.Connection, task_id: int):
    row = db.execute("SELECT * FROM task_card WHERE id = ?", (task_id,)).fetchone()
    return dict(row) if row else None


def get_today_task(db: sqlite3.Connection, today_dow: int):
    row = db.execute(
        "SELECT * FROM task_card WHERE day_of_week = ?", (today_dow,)
    ).fetchone()
    return dict(row) if row else None
