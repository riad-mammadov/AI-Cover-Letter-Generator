from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from file import router as fileRouter
app = FastAPI()


origins = [
    "https://ai-cover-letter-generator-khaki.vercel.app",
    
    
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origins],     
    allow_credentials=True,
    allow_methods=["*"],         
    allow_headers=["*"],         
)

app.include_router(fileRouter)