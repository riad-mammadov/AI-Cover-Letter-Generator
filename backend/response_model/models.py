from pydantic import BaseModel
from typing import Dict,List

class PDFInfo(BaseModel):
    filename: str
    section: Dict[str, str]
