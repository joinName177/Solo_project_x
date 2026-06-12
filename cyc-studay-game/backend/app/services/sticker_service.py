import sqlite3
from datetime import date

from app.repositories import sticker_repo

LEVELS = [
    (3, "实习司机", "实习贴纸"),
    (7, "正式司机", "纸盘方向盘"),
    (14, "金牌司机", "金牌司机证书"),
    (21, "车队队长", "解锁下周2个新任务"),
]


def get_stickers_by_date(db: sqlite3.Connection, date_str: str):
    return sticker_repo.get_by_date(db, date_str)


def get_total(db: sqlite3.Connection):
    return sticker_repo.get_total(db)


def get_level_info(db: sqlite3.Connection):
    total = sticker_repo.get_total(db)
    current_level = "新手司机"
    current_reward = ""
    next_level = None
    next_threshold = None

    for threshold, name, reward in LEVELS:
        if total >= threshold:
            current_level = name
            current_reward = reward
        else:
            next_level = name
            next_threshold = threshold
            break

    return {
        "total_stickers": total,
        "current_level": current_level,
        "current_reward": current_reward,
        "next_level": next_level,
        "next_threshold": next_threshold,
    }


def add_sticker(db: sqlite3.Connection, task_id: int):
    today = date.today().isoformat()
    existing = sticker_repo.get_by_date(db, today)
    current_rounds = [s for s in existing if s["task_id"] == task_id]
    if len(current_rounds) >= 3:
        raise ValueError("今天该任务已完成3轮，不能更多了")
    next_round = len(current_rounds) + 1
    sticker_id = sticker_repo.create(db, task_id, next_round, today)
    level_before = get_level_info(db)
    return {"id": sticker_id, "round": next_round, "level": level_before}


def remove_sticker(db: sqlite3.Connection, sticker_id: int):
    sticker_repo.delete(db, sticker_id)
    return get_level_info(db)
