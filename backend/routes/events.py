from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from db import SessionLocal
from models.event import Event
from models.user import User
from schemas.event import EventCreate, EventOut
from auth.jwt_handler import decode_access_token

router = APIRouter(prefix="/events")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(token: str, db: Session = Depends(get_db)):
    payload = decode_access_token(token)
    email = payload.get("sub")
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/", response_model=EventOut)
def create_event(data: EventCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    new_event = Event(**data.dict(), organizer_email=user.email)
    db.add(new_event)
    db.commit()
    db.refresh(new_event)
    return new_event

@router.get("/", response_model=list[EventOut])
def get_events(db: Session = Depends(get_db)):
    return db.query(Event).all()

@router.get("/{event_id}", response_model=EventOut)
def get_event(event_id: int, db: Session = Depends(get_db)):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event

@router.delete("/{event_id}")
def delete_event(event_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    event = db.query(Event).filter(Event.id == event_id, Event.organizer_email == user.email).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found or not yours")
    db.delete(event)
    db.commit()
    return {"message": "Event deleted"}

@router.put("/{event_id}", response_model=EventOut)
def update_event(
    event_id: int,
    data: EventCreate,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    event = db.query(Event).filter(Event.id == event_id, Event.organizer_email == user.email).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found or not yours")

    for key, value in data.dict().items():
        setattr(event, key, value)

    db.commit()
    db.refresh(event)
    return event

