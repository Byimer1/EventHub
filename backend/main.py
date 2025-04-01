# from fastapi import FastAPI
# from routes import auth, events
# from db import Base, engine

# app = FastAPI()
# app.include_router(auth.router)
# app.include_router(events.router)

# Base.metadata.create_all(bind=engine)


# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # ✅ import this
from routes import auth, events
from db import Base, engine
from models import user, event

app = FastAPI()

# ✅ Add this to allow frontend access (adjust origin if needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables
Base.metadata.create_all(bind=engine)

# Include routes
app.include_router(auth.router)
app.include_router(events.router)
