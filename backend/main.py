from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from file import router as fileRouter
app = FastAPI()


origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,     
    allow_credentials=True,
    allow_methods=["*"],         
    allow_headers=["*"],         
)

app.include_router(fileRouter)