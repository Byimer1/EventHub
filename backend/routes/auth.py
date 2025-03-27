from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from db import SessionLocal
from models.user import User
from auth.hash import hash_password, verify_password
from auth.jwt_handler import create_access_token, decode_access_token
from pydantic import BaseModel

router = APIRouter(prefix="/auth")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class SignUpModel(BaseModel):
    email: str
    password: str

class LoginModel(BaseModel):
    email: str
    password: str

@router.post("/signup")
def signup(data: SignUpModel, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == data.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = User(
        email=data.email,
        hashed_password=hash_password(data.password)
    )
    db.add(new_user)
    db.commit()
    return {"message": "User created successfully"}

@router.post("/login")
def login(data: LoginModel, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_access_token({"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}

@router.get("/me")
def get_me(token: str, db: Session = Depends(get_db)):
    try:
        payload = decode_access_token(token)
        email = payload.get("sub")
        user = db.query(User).filter(User.email == email).first()
        return {"id": user.id, "email": user.email}
    except:
        raise HTTPException(status_code=401, detail="Invalid token")
