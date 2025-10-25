from langchain_anthropic import ChatAnthropic
from dotenv import load_dotenv
import json, os, re, sys

load_dotenv()

# Initialize Claude (use the latest valid model)
llm = ChatAnthropic(
    model="claude-sonnet-4-5-20250929",  
    temperature=0.2,
    api_key=os.getenv("ANTHROPIC_API_KEY")
)

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

    response = llm.invoke(prompt)
    result = response.content if hasattr(response, "content") else str(response)

    # 🧹 Clean & extract JSON safely
    # 1. Remove markdown code fences
    text = re.sub(r"```(?:json)?|```", "", result)
    # 2. Extract first valid JSON object in case of extra text
    match = re.search(r"\{.*\}", text, re.DOTALL)
    if not match:
        print("Claude returned no JSON. Raw output:\n", result)
        sys.exit(1)

    cleaned = match.group(0)
    try:
        data = json.loads(cleaned)
    except json.JSONDecodeError as e:
        print("Invalid JSON. Raw:\n", cleaned)
        print("Error:", e)
        sys.exit(1)

    return data

# if __name__ == "__main__":
#     text = """
#     Build a web platform that helps students collaborate on projects.
#     It should analyze uploaded PDFs and generate tasks and roles automatically.
#     """
#     result = run_pm_agent(text)
#     print(json.dumps(result, indent=2))
