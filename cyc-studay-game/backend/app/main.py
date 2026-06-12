from contextlib import asynccontextmanager

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
import sqlite3

from app.database import init_db, get_connection
from app.routers import tasks, stickers, records


def get_db():
    with get_connection() as conn:
        yield conn


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(title="小司机送货啦", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks.router, prefix="/api")
app.include_router(stickers.router, prefix="/api")
app.include_router(records.router, prefix="/api")


@app.get("/api/health")
def health():
    return {"status": "ok"}
