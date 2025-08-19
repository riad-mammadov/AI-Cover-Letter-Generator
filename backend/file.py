from fastapi import FastAPI, UploadFile, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from response_model.models import PDFInfo
import pymupdf
import re

router = APIRouter(prefix="/file", tags=["File"])

remove_this = ["•", "-", '\n', "_"]

def clean_up(text):
    keywords = [
        "Relevant Experience",
        "Projects",
        "Skills",
        "Education",
        "Certifications"
    ]

    # Find all keyword positions
    positions = sorted(
        (m.start(), k) for k in keywords for m in re.finditer(rf"\b{k}\b", text)
    )

    sections = {}
    for i, (start, keyword) in enumerate(positions):
        end = positions[i + 1][0] if i + 1 < len(positions) else len(text)
        section_text = text[start + len(keyword):end].strip()

        # Remove unwanted symbols
        for char in remove_this:
            section_text = section_text.replace(char, "")

        section_text = re.sub(r"[_-]{3,}", "", section_text)

        sections[keyword] = section_text

    return sections

# def condense_resume(resume, max_words_per_section=150):
    # condensed = {}
    
    # for section, content in resume.items():
    #     text = content.replace("\n", " ")
        
    #     text = " ".join(text.split())
    #     for b in bulletpoint:
    #         text = text.replace(b, '')
    #     words = text.split()
    #     if len(words) > max_words_per_section:
    #         words = words[:max_words_per_section]
    #         text = " ".join(words) + "..."
    #     else:
    #         text = " ".join(words)
        
    #     condensed[section] = text
    
    # return condensed


@router.post("/upload", response_model=PDFInfo)
async def upload(uploaded_file: UploadFile):
    file_bytes = await uploaded_file.read()
    doc = pymupdf.open(stream=file_bytes, filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text()
    
    text = re.sub(r"\s+", " ", text)
    
    section = clean_up(text)

    return PDFInfo(filename = uploaded_file.filename, section = section)
