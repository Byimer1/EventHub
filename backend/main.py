from fastapi import FastAPI
from routes import auth, events
from db import Base, engine

app = FastAPI()
app.include_router(auth.router)
app.include_router(events.router)

Base.metadata.create_all(bind=engine)
