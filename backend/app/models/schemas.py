"""Pydantic v2 request / response schemas."""
from __future__ import annotations

from enum import Enum
from typing import Optional
from pydantic import BaseModel, field_validator


# ── Enums ────────────────────────────────────────────────────────────────────

class WhoEnum(str, Enum):
    self   = "self"
    other  = "other"

class WhatEnum(str, Enum):
    crisis     = "crisis"
    mobile     = "mobile"
    talk       = "talk"
    substances = "substances"
    housing    = "housing"
    dv         = "dv"
    youth      = "youth"
    veteran    = "veteran"

class UrgEnum(str, Enum):
    now   = "now"
    today = "today"
    week  = "week"


# ── Requests ─────────────────────────────────────────────────────────────────

class IntakeRequest(BaseModel):
    """Full structured intake from the three-step wizard."""
    who:        Optional[WhoEnum]  = None
    what:       Optional[WhatEnum] = None
    urg:        Optional[UrgEnum]  = None
    free_text:  Optional[str]      = None   # optional free-text field for ML classification

    @field_validator("free_text")
    @classmethod
    def truncate_free_text(cls, v: Optional[str]) -> Optional[str]:
        """Guard against very long inputs."""
        if v and len(v) > 1000:
            return v[:1000]
        return v


class ClassifyRequest(BaseModel):
    """Standalone text classification request (for the ML endpoint)."""
    text: str
    top_k: int = 3

    @field_validator("text")
    @classmethod
    def text_not_empty(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("text cannot be empty")
        return v[:1000]


# ── Resource sub-models ───────────────────────────────────────────────────────

class ResourceAction(BaseModel):
    """A single actionable chip on a resource card."""
    t: str          # "call" | "sms" | "web"
    l: str          # display label
    n: Optional[str] = None   # phone number (digits)
    u: Optional[str] = None   # URL (for web actions)


class Resource(BaseModel):
    """A single resource entry."""
    icon:    str
    urg:     bool
    name:    str
    org:     str
    desc:    str
    avail:   str
    actions: list[ResourceAction]


# ── Responses ─────────────────────────────────────────────────────────────────

class ClassifyPrediction(BaseModel):
    category: str
    label:    str
    score:    float


class ClassifyResponse(BaseModel):
    predictions: list[ClassifyPrediction]


class IntakeResponse(BaseModel):
    """What the wizard receives back after submitting intake."""
    category:        str
    category_label:  str
    resources:       list[Resource]
    crisis_resources: list[Resource]   # always populated when urg == "now"


class ResourceListResponse(BaseModel):
    category: str
    resources: list[Resource]
