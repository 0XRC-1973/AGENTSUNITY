import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.agents_router import router as agents_router

app = FastAPI(
    title="AGENTS UNITY Multi-Agent Service",
    description="Autonomous AI Learning + Recruitment Intelligence Platform (AGENTSUNITY)",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(agents_router)

@app.get("/")
def root():
    return {
        "service": "AGENTS UNITY - Autonomous Multi-Agent Brain",
        "platform": "AGENTSUNITY-2",
        "tagline": "Learn. Practice. Prove. Get Hired.",
        "status": "OPERATIONAL",
        "documentation": "/docs"
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "ai-service",
        "version": "1.0.0"
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
