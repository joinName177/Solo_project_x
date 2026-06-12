from pydantic import BaseModel
from typing import Optional


class TaskCard(BaseModel):
    id: int
    day_of_week: int
    name: str
    action_desc: str
    props: Optional[str] = None
    brain_goal: str
    car_script: str
    success_criteria: str
    fail_script: str
    easy_mode: Optional[str] = None
    hard_mode: Optional[str] = None
