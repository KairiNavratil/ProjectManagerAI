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

- 5 high-level tasks (each with a short description and the most suited role)

Return STRICT JSON in the format:
{{
  "tasks": [
    {{"title": "task title", "description": "short summary", "role": "Role Name"}},
    ...
  ]
}}

Project Brief:
\"\"\"{project_text}\"\"\"
"""

    try:
        response = llm.invoke(prompt)
        result = response.content if hasattr(response, "content") else str(response)

        # 🧹 Clean & extract JSON safely
        text = re.sub(r"```(?:json)?|```", "", result)
        match = re.search(r"\{.*\}", text, re.DOTALL)

        if not match:
            print("Claude returned no JSON. Raw output:\n", result)
            # 💡 FIX: Raise an error instead of exiting
            raise ValueError(f"Agent returned no JSON. Raw output: {result}")

        cleaned = match.group(0)
        data = json.loads(cleaned)
        return data

    except json.JSONDecodeError as e:
        print("Invalid JSON. Raw:\n", cleaned)
        print("Error:", e)
        # 💡 FIX: Raise an error instead of exiting
        raise ValueError(f"Agent returned invalid JSON. Raw: {cleaned}")
    
    except Exception as e:
        # Catch any other errors (like API key issues)
        print(f"Error during agent run: {e}")
        raise ValueError(f"An unexpected error occurred in the agent: {e}")