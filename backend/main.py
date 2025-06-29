from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated
import models
from fastapi.middleware.cors import CORSMiddleware
from routes.route import router

app = FastAPI()

origins = [
  'http://localhost:5173'
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
)

app.include_router(router)