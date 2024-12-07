from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth, study_material

app = FastAPI(title="StudyCircle API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(study_material.router, prefix="/api/study-materials", tags=["study-materials"])

@app.get("/")
async def root():
    return {"message": "Bem-vindo à API do StudyCircle!"}

