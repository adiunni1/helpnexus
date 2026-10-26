"""
FastAPI application entry point.

Local dev:  uvicorn app.main:app --reload --port 8000
AWS Lambda: handler.py wraps this with Mangum
"""
from __future__ import annotations

import logging
import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import classify, resources
from app.services.classifier import classifier

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# Lifespan — load ML model once at startup
# ---------------------------------------------------------------------------

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Loading ML classifier…")
    try:
        classifier.load()
        logger.info("Classifier ready.")
    except Exception as exc:
        logger.warning(f"Classifier failed to load ({exc}). Continuing without ML.")
    yield
    logger.info("Shutting down.")


# ---------------------------------------------------------------------------
# App
# ---------------------------------------------------------------------------

app = FastAPI(
    title="Lane County Resource Finder API",
    description=(
        "Routes people experiencing mental health crises, housing instability, "
        "substance use challenges, and other needs to the right services in "
        "Eugene / Lane County, Oregon."
    ),
    version="0.1.0",
    lifespan=lifespan,
)

# CORS — in production, restrict origins to your frontend domain
allowed_origins = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:3000,http://127.0.0.1:3000",
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(classify.router, prefix="/api/v1")
app.include_router(resources.router, prefix="/api/v1")


# ---------------------------------------------------------------------------
# Health
# ---------------------------------------------------------------------------

@app.get("/health")
async def health():
    return {"status": "ok", "classifier_loaded": classifier._loaded}
