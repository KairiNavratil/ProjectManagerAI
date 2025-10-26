from memory_chroma import create_memory_collection, retrieve_context

text = """
The project aims to build an AI productivity assistant for university teams.
It analyzes project briefs, identifies tasks, assigns roles, and helps track progress.
The backend uses Supabase and FastAPI, and Claude powers the reasoning.
"""

create_memory_collection("demo_local", text)

print("Testing retrieval...\n")
context = retrieve_context("demo_local", "AI productivity assistant")
print(context)
