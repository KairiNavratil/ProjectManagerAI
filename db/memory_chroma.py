from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
import os

# Load local embeddings model from Hugging Face
embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

def create_memory_collection(project_id: str, text: str):
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    chunks = splitter.create_documents([text])

    chroma_db = Chroma(
        collection_name=f"project_{project_id}",
        embedding_function=embeddings,
        persist_directory=f"./chroma_store/{project_id}"
    )
    chroma_db.add_texts([c.page_content for c in chunks])
    chroma_db.persist()
    return len(chunks)

def retrieve_context(project_id: str, query: str, n=5):
    chroma_db = Chroma(
        collection_name=f"project_{project_id}",
        embedding_function=embeddings,
        persist_directory=f"./chroma_store/{project_id}"
    )
    docs = chroma_db.similarity_search(query, k=n)
    return "\n".join([d.page_content for d in docs])
