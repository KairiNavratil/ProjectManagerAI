import os, sys, re, json
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from langchain_anthropic import ChatAnthropic
from db.memory_chroma import retrieve_context
from dotenv import load_dotenv

load_dotenv()


llm = ChatAnthropic(
    model="claude-sonnet-4-5-20250929",  
    temperature=0.2,
    anthropic_api_key=os.getenv("ANTHROPIC_API_KEY")
)

def run_specialist_agent(project_id: str, role: str, task_title: str):
    # Retrieve contextual memory
    context = retrieve_context(project_id, f"Details for task: {task_title}")

    # Construct the prompt
    prompt = f"""
You are a senior {role}.
Your job is to take the high-level task "{task_title}" and break it down into 5–10 detailed subtasks.
Context from the project brief:
{context}

Return only JSON array of strings like:
["Setup Supabase schema", "Implement /auth/login route", "Integrate frontend form", ...]
"""

    response = llm.invoke(prompt)

  
    result = response.content if hasattr(response, "content") else str(response)

    # 🧹 Clean up potential markdown or extra text before parsing
    cleaned = re.sub(r"```(?:json)?|```", "", result).strip()

    try:
        subtasks = json.loads(cleaned)
    except json.JSONDecodeError:
        print("⚠️ Claude returned invalid JSON. Raw output:\n", result)
        raise

    return subtasks


if __name__ == "__main__":
    res = run_specialist_agent("demo_project", "Backend Developer", "Implement authentication system")
    print(json.dumps(res, indent=2))
