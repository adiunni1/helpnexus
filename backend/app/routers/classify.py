"""Classification and intake endpoints."""
from fastapi import APIRouter, BackgroundTasks

from app.models.schemas import (
    ClassifyRequest,
    ClassifyResponse,
    ClassifyPrediction,
    IntakeRequest,
    IntakeResponse,
)
from app.services.classifier import classifier, CATEGORIES
from app.services import resource_service

router = APIRouter(tags=["classify"])

CAT_NAMES = {k: v["label"] for k, v in CATEGORIES.items()}


@router.post("/classify", response_model=ClassifyResponse)
async def classify_text(req: ClassifyRequest):
    """
    Run the ML classifier on free text and return ranked category predictions.

    Useful for a future free-text intake mode or admin tooling.
    """
    preds = classifier.classify_text(req.text, top_k=req.top_k)
    return ClassifyResponse(
        predictions=[ClassifyPrediction(**p) for p in preds]
    )


@router.post("/intake", response_model=IntakeResponse)
async def submit_intake(req: IntakeRequest):
    """
    Full three-step wizard intake.  Returns matched resources.

    - If `what` is provided (user picked from wizard) it is used directly.
    - If `free_text` is also provided the ML classifier may override it.
    - When `urg == "now"`, crisis resources are always prepended.
    """
    category = classifier.classify_intake(
        what=req.what.value if req.what else None,
        free_text=req.free_text,
    )

    resources       = resource_service.get_resources(category)
    crisis_resources: list = []

    if req.urg and req.urg.value == "now" and category != "crisis":
        crisis_resources = resource_service.get_crisis_resources(top_n=2)

    return IntakeResponse(
        category=category,
        category_label=CAT_NAMES.get(category, category),
        resources=resources,
        crisis_resources=crisis_resources,
    )
