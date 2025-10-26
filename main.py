from fastapi import FastAPI, UploadFile, File, Body, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from db.supabase_client import supabase
from utils.pdf_utils import extract_text_from_pdf
from db.memory_chroma import create_memory_collection
from agents.pm_agent import run_pm_agent
from agents.specialist_agent import run_specialist_agent

load_dotenv()
app = FastAPI()

# Define the origins (domains) that are allowed to make requests
origins = [
    "http://localhost:8080",  # Your frontend's origin
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,       # Allows specified origins
    allow_credentials=True,    # Allows cookies
    allow_methods=["*"],         # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],         # Allows all headers
)

@app.post("/upload_project")
async def upload_project(project_id: str, file: UploadFile = File(...)):
    
    # 💡 FIX: Add try...except block to catch agent errors
    try:
        text = extract_text_from_pdf(file.file)
        n_chunks = create_memory_collection(project_id, text)

        data = run_pm_agent(text)  # <--- This might fail

        for index, task in enumerate(data["tasks"]):
            supabase.table("Tasks").insert({
                "role": task["role"],
                "project_id": project_id,
                "title": task["title"],
                "description": task["description"],
                "status": "todo",
            }).execute()

        return {"tasks": data["tasks"], "memory_chunks": n_chunks}

    except ValueError as e:
        # This catches the errors we raised in run_pm_agent
        print(f"Failed to process project: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to process project: {e}")
    
    except Exception as e:
        # Catch any other unexpected errors
        print(f"An unexpected server error occurred: {e}")
        raise HTTPException(status_code=500, detail=f"An unexpected server error occurred: {e}")
    
@app.post("/specialize_task")
async def specialize_task(
    project_id: str = Body(...),
    role: str = Body(...),
    task_title: str = Body(...)
):
    subtasks = run_specialist_agent(project_id, role, task_title)
    for st in subtasks:
        supabase.table("subtasks").insert({
            "project_id": project_id,
            "title": st
        }).execute()
    return {"subtasks": subtasks}