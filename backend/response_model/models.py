from pydantic import BaseModel
from typing import Dict,List

class PDFInfo(BaseModel):
    filename: str
    description: str
    cv_text: str

class AIRes(BaseModel):
    role: str
    text: str

