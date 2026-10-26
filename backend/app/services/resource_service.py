"""Resource lookup service — loads resources.json and serves them by category."""
from __future__ import annotations

import json
import logging
from functools import lru_cache
from pathlib import Path
from typing import Optional

from app.models.schemas import Resource

logger = logging.getLogger(__name__)

DATA_FILE = Path(__file__).parent.parent / "data" / "resources.json"


@lru_cache(maxsize=1)
def _load_db() -> dict[str, list[dict]]:
    """Load and cache the resource JSON file."""
    with open(DATA_FILE, encoding="utf-8") as fh:
        data = json.load(fh)
    logger.info(f"Resource database loaded ({sum(len(v) for v in data.values())} entries).")
    return data


def get_resources(category: str) -> list[Resource]:
    """Return all resources for a given category."""
    db = _load_db()
    raw = db.get(category, [])
    return [Resource(**r) for r in raw]


def get_crisis_resources(top_n: int = 2) -> list[Resource]:
    """Return the top crisis resources (always prepended when urgency == 'now')."""
    return get_resources("crisis")[:top_n]


def get_all_categories() -> list[str]:
    return list(_load_db().keys())


def reload() -> None:
    """Force a reload from disk (useful in development)."""
    _load_db.cache_clear()
    _load_db()
