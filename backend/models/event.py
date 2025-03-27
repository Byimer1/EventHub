from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from db import Base
from datetime import datetime

class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String)
    location = Column(String)
    start_time = Column(DateTime, nullable=False)
    end_time = Column(DateTime, nullable=False)
    organizer_email = Column(String, ForeignKey("users.email"))
    created_at = Column(DateTime, default=datetime.utcnow)
