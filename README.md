# 🌍 Hyper-Local AI Tutor (RAG-Powered)

> An AI education platform that explains complex academic concepts using **local cultural metaphors** (e.g., explaining Physics using Lagos traffic dynamics).

![Project Status](https://img.shields.io/badge/Status-Prototype-green)
![Stack](https://img.shields.io/badge/Tech-FastAPI%20%7C%20Next.js%20%7C%20Supabase%20%7C%20Cohere-blue)

## 💡 The Problem
Generic AI models (like ChatGPT) teach using Western-centric examples. A student in Nigeria, Kenya, or India might struggle to relate to examples involving "baseball" or "snow."

## 🚀 The Solution
This application uses **RAG (Retrieval-Augmented Generation)** to ground AI responses in a specific cultural knowledge base.
1.  **Ingest:** We scrape local news, blogs, and wikis to build a "Cultural Knowledge Base."
2.  **Retrieve:** When a student asks a question, we find relevant local metaphors using Vector Search.
3.  **Generate:** We use **Cohere's Enterprise AI** to weave the academic concept with the local metaphor.

---

## 🏗️ Architecture

```mermaid
graph LR
    A[User Query] --> B[Next.js Frontend]
    B --> C[FastAPI Backend]
    C --> D{Vector Search}
    D -->|Query| E[(Supabase DB)]
    E -->|Local Context| D
    D --> F[Cohere LLM]
    F -->|Final Explanation| B

## 🛠️ Tech Stack

### Backend (The Brain)
- **Language:** Python 3.11+
- **Framework:** FastAPI
- **AI Orchestration:** LangChain
- **LLM:** Cohere (Command-R)
- **Embeddings:** HuggingFace (all-MiniLM-L6-v2)
- **Database:** Supabase (pgvector)

### Frontend (The Face)
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS

### Automated Pipeline
- **Scraper:** BeautifulSoup4 + Requests
- **PDF Processing:** PyPDF
- **Ingestion:** Automated script reads from `sources.txt` to continuously update the knowledge base.

---

## ⚡ Quick Start

### 1. Clone the Repo
```bash
git clone https://github.com/yourusername/ai-tutor.git
cd ai-tutor

cd api
pip install -r requirements.txt

# Create a `.env` file with:
# SUPABASE_URL=
# SUPABASE_KEY=
# COHERE_API_KEY=

python -m uvicorn main:app --reload

cd web
npm install
npm run dev

## 🏗️ Scripts
api/sources.txt
python api/scrape_and_feed.py

🔮 Roadmap
a. Voice Mode: Text-to-Speech for accessibility
b. Multi-Region Support: Nigeria, Kenya & India modes
c. WhatsApp Integration: Twilio bot for low-data environments

🤝 Contributing
### How to Push this to GitHub (The Final Commands)
