from langchain.chat_models import ChatAnthropic
import json
from db.memory_chroma import retrieve_context

llm = ChatAnthropic(model="claude-3-sonnet-20240229", temperature=0.2)

def run_specialist_agent(project_id: str, role: str, task_title: str):
    context = retrieve_context(project_id, f"Details for task: {task_title}")
    prompt = f"""
You are a senior {role}.
Your job is to take the high-level task "{task_title}" and break it down into 5–10 detailed subtasks.
Context from the project brief:
{context}

Return only JSON array of strings like:
["Setup Supabase schema", "Implement /auth/login route", "Integrate frontend form", ...]
"""
    response = llm.predict(prompt)
    try:
        subtasks = json.loads(response)
    except json.JSONDecodeError:
        print("Invalid JSON:", response)
        raise
    return subtasks
