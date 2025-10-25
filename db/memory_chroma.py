from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter


embeddings = OpenAIEmbeddings(model="text-embedding-3-small")

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
