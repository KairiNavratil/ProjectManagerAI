from fastapi import FastAPI, UploadFile, File, Body
from dotenv import load_dotenv
from db.supabase_client import supabase
from utils.pdf_utils import extract_text_from_pdf
from db.memory_chroma import create_memory_collection
from agents.pm_agent import run_pm_agent
from agents.specialist_agent import run_specialist_agent

load_dotenv()
app = FastAPI()

@app.post("/upload_project")
async def upload_project(project_id: str, file: UploadFile = File(...)):
    text = extract_text_from_pdf(file.file)
    n_chunks = create_memory_collection(project_id, text)

    data = run_pm_agent(text)
    for index, task in enumerate(data["tasks"]):
        supabase.table("Tasks").insert({
            "role": task["role"],
            "project_id": project_id,
            "title": task["title"],
            "description": task["description"],
            "status": "todo",
        }).execute()

    return {"tasks": data["tasks"], "memory_chunks": n_chunks}

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