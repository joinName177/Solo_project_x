import sqlite3
import os
from contextlib import contextmanager

from app.data.task_cards import SEED_TASKS

DB_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "data")
DB_PATH = os.environ.get("DATABASE_URL", f"sqlite:///{DB_DIR}/app.db").replace(
    "sqlite:///", ""
)


@contextmanager
def get_connection() -> sqlite3.Connection:
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    try:
        yield conn
    finally:
        conn.close()


def init_db():
    with get_connection() as conn:
        conn.executescript(
            """
            CREATE TABLE IF NOT EXISTS task_card (
                id          INTEGER PRIMARY KEY,
                day_of_week INTEGER NOT NULL,
                name        TEXT    NOT NULL,
                action_desc TEXT    NOT NULL,
                props       TEXT,
                brain_goal  TEXT    NOT NULL,
                car_script  TEXT    NOT NULL,
                success_criteria TEXT NOT NULL,
                fail_script TEXT    NOT NULL,
                easy_mode   TEXT,
                hard_mode   TEXT
            );

            CREATE TABLE IF NOT EXISTS sticker_record (
                id          INTEGER PRIMARY KEY AUTOINCREMENT,
                task_id     INTEGER NOT NULL REFERENCES task_card(id),
                round       INTEGER NOT NULL,
                date        TEXT    NOT NULL,
                created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
            );

            CREATE TABLE IF NOT EXISTS parent_record (
                id          INTEGER PRIMARY KEY AUTOINCREMENT,
                task_id     INTEGER NOT NULL REFERENCES task_card(id),
                date        TEXT    NOT NULL,
                hardest     TEXT,
                happiest    TEXT,
                created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
            );
            """
        )

        cur = conn.execute("SELECT COUNT(*) FROM task_card")
        if cur.fetchone()[0] == 0:
            for t in SEED_TASKS:
                conn.execute(
                    """INSERT INTO task_card
                       (id, day_of_week, name, action_desc, props, brain_goal,
                        car_script, success_criteria, fail_script, easy_mode, hard_mode)
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                    (
                        t["id"], t["day_of_week"], t["name"], t["action_desc"],
                        t["props"], t["brain_goal"], t["car_script"],
                        t["success_criteria"], t["fail_script"],
                        t["easy_mode"], t["hard_mode"],
                    ),
                )
            conn.commit()
