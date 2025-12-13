from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.db.mongodb import connect_to_mongo, close_mongo_connection

app = FastAPI(
    title="Sweet Shop Management System",
    version="1.0.0",
)

# CORS configuration (for React frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    await connect_to_mongo()


@app.on_event("shutdown")
async def shutdown_event():
    await close_mongo_connection()


# Include all API routes
app.include_router(api_router, prefix="/api")


@app.get("/")
async def root():
    return {"message": "Sweet Shop API is running"}
