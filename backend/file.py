from fastapi import FastAPI, UploadFile, APIRouter, Form
from fastapi.middleware.cors import CORSMiddleware
from response_model.models import PDFInfo, AIRes
import pymupdf
import re
from google import genai
from google.genai import types
from dotenv import load_dotenv
import os
from prompt import cover_letter_prompt

load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")

router = APIRouter(prefix="/file", tags=["File"])

client = genai.Client(api_key=API_KEY)

def clean_up(text, description):
    text = text.strip()                         
    text = re.sub(r'\s+', ' ', text)

    description = description.strip()
    description = re.sub(r'\s+', ' ', description)

    return {"cv_text": text, "description": description}

def generate(prompt: str):
    model = "gemini-2.0-flash"
    contents = [
        types.Content(
            role="user",
            parts=[
                types.Part.from_text(text=prompt),
            ],
        ),
    ]
    tools = [
        types.Tool(googleSearch=types.GoogleSearch(
        )),
    ]
    generate_content_config = types.GenerateContentConfig(
        temperature= 0.3,
        tools=tools,
    )

    res = client.models.generate_content_stream(
        model=model,
        contents=contents,
        config=generate_content_config,
    )

    generated = "".join(
    part.text
    for chunk in res
    for candidate in chunk.candidates
    if candidate.content and candidate.content.parts
    for part in candidate.content.parts
    if part.text
)

    return {"role": "model", "text": generated}

        

@router.post("/gen", response_model=AIRes)
def get_content(cv_text, description):
    prompt = cover_letter_prompt(cv_text=cv_text, job_desc=description)
    res = generate(prompt)
    return res


@router.post("/upload")
async def upload(uploaded_file: UploadFile, description: str = Form(...)):
    file_bytes = await uploaded_file.read()
    doc = pymupdf.open(stream=file_bytes, filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text()
    
    text = re.sub(r"\s+", " ", text)
    section = clean_up(text, description)

    response = get_content(**section)

    return response

# @router.post("/job_desc")
# def description(description: str):
#     print(description)
