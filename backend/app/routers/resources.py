"""Resource endpoints."""
from fastapi import APIRouter, HTTPException

from app.models.schemas import ResourceListResponse
from app.services import resource_service

router = APIRouter(prefix="/resources", tags=["resources"])


@router.get("/{category}", response_model=ResourceListResponse)
async def list_resources(category: str):
    """Return all resources for a given category slug."""
    valid = resource_service.get_all_categories()
    if category not in valid:
        raise HTTPException(
            status_code=404,
            detail=f"Unknown category '{category}'. Valid: {valid}",
        )
    resources = resource_service.get_resources(category)
    return ResourceListResponse(category=category, resources=resources)


@router.get("/", response_model=dict)
async def list_categories():
    """Return the list of available category slugs."""
    return {"categories": resource_service.get_all_categories()}
