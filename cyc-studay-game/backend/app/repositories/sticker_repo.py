import sqlite3


def get_by_date(db: sqlite3.Connection, date_str: str):
    rows = db.execute(
        "SELECT * FROM sticker_record WHERE date = ? ORDER BY created_at", (date_str,)
    ).fetchall()
    return [dict(r) for r in rows]


def get_total(db: sqlite3.Connection):
    row = db.execute("SELECT COUNT(*) as total FROM sticker_record").fetchone()
    return row["total"]


def create(db: sqlite3.Connection, task_id: int, round_num: int, date_str: str) -> int:
    cur = db.execute(
        "INSERT INTO sticker_record (task_id, round, date) VALUES (?, ?, ?)",
        (task_id, round_num, date_str),
    )
    db.commit()
    return cur.lastrowid


def delete(db: sqlite3.Connection, sticker_id: int):
    db.execute("DELETE FROM sticker_record WHERE id = ?", (sticker_id,))
    db.commit()
