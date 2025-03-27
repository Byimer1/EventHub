from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class EventCreate(BaseModel):
    title: str
    description: Optional[str] = None
    location: Optional[str] = None
    start_time: datetime
    end_time: datetime

class EventOut(EventCreate):
    id: int
    organizer_email: str
    created_at: datetime

    class Config:
        orm_mode = True
