import sqlite3


def get_by_date(db: sqlite3.Connection, date_str: str):
    row = db.execute(
        "SELECT * FROM parent_record WHERE date = ?", (date_str,)
    ).fetchone()
    return dict(row) if row else None


def get_week_records(db: sqlite3.Connection):
    rows = db.execute(
        "SELECT * FROM parent_record ORDER BY date DESC LIMIT 7"
    ).fetchall()
    return [dict(r) for r in rows]


def upsert(db: sqlite3.Connection, task_id: int, date_str: str, hardest: str, happiest: str) -> int:
    existing = db.execute(
        "SELECT id FROM parent_record WHERE task_id = ? AND date = ?",
        (task_id, date_str),
    ).fetchone()
    if existing:
        db.execute(
            "UPDATE parent_record SET hardest = ?, happiest = ? WHERE id = ?",
            (hardest, happiest, existing["id"]),
        )
        record_id = existing["id"]
    else:
        cur = db.execute(
            "INSERT INTO parent_record (task_id, date, hardest, happiest) VALUES (?, ?, ?, ?)",
            (task_id, date_str, hardest, happiest),
        )
        record_id = cur.lastrowid
    db.commit()
    return record_id
