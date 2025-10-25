from langchain.chat_models import ChatAnthropic
import json

llm = ChatAnthropic(model="claude-3-sonnet-20240229", temperature=0.2)

def run_pm_agent(project_text: str):
    prompt = f"""
You are an expert project manager.
Analyze the following project brief and produce:

- 3–5 key roles (e.g., Backend Developer, UI/UX Designer, Project Lead)
- 5–10 high-level tasks (each with a short description)

Return STRICT JSON in the format:
{{
  "roles": ["role1", "role2"],
  "tasks": [
    {{"title": "task title", "description": "short summary"}},
    ...
  ]
}}

Project Brief:
\"\"\"{project_text}\"\"\"
"""
    result = llm.predict(prompt)
    try:
        data = json.loads(result)
    except json.JSONDecodeError:
        print("Claude returned invalid JSON. Result:", result)
        raise
    return data
