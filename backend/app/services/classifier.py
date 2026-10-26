"""
ML intake classifier.

Phase 1 (now):  Zero-shot semantic similarity using sentence-transformers.
                No training data required — compares user text against
                category prototype embeddings.

Phase 2 (when CAHOOTS CSV data arrives):
                Train a lightweight logistic-regression head on top of
                sentence embeddings, serialized to disk with joblib.
                Swap in by setting CLASSIFIER_MODEL_PATH env var.
"""
from __future__ import annotations

import json
import logging
import os
from pathlib import Path
from typing import Optional

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Category definitions — label, description text, and keyword hints.
# The full prototype string is what gets embedded during load().
# ---------------------------------------------------------------------------
CATEGORIES: dict[str, dict] = {
    "crisis": {
        "label": "Crisis or thoughts of self-harm",
        "description": (
            "Suicidal crisis, self-harm, feeling unsafe, active mental health emergency, "
            "overdose, thoughts of hurting myself or someone else, psychiatric emergency."
        ),
        "keywords": [
            "crisis", "suicidal", "suicide", "self-harm", "unsafe", "emergency",
            "overdose", "harm myself", "end my life", "kill myself",
        ],
    },
    "mobile": {
        "label": "Mobile crisis response",
        "description": (
            "Need someone to come to me in person, mobile crisis team, non-police responder, "
            "CAHOOTS, welfare check, someone to come to my location, in-person mental health response."
        ),
        "keywords": [
            "come to me", "in person", "mobile", "visit", "respond", "non-police",
            "cahoots", "welfare check", "someone to come",
        ],
    },
    "talk": {
        "label": "Emotional support or someone to talk to",
        "description": (
            "Peer support, counseling, therapy, mental health support, depression, anxiety, "
            "grief, loneliness, stress, someone to listen, emotional support, psychiatry."
        ),
        "keywords": [
            "talk", "counseling", "therapy", "support", "peer", "listen",
            "depression", "anxiety", "stressed", "lonely", "grief", "overwhelmed",
        ],
    },
    "substances": {
        "label": "Substance use or addiction",
        "description": (
            "Alcohol, drugs, substance use disorder, addiction, recovery, detox, sobriety, "
            "withdrawal symptoms, harm reduction, relapse, methamphetamine, opioids, fentanyl."
        ),
        "keywords": [
            "drugs", "alcohol", "addiction", "substance", "detox", "withdrawal",
            "recovery", "sober", "relapse", "heroin", "meth", "opioid", "fentanyl",
        ],
    },
    "housing": {
        "label": "Housing or shelter",
        "description": (
            "Homeless, no place to sleep, shelter, eviction, housing crisis, "
            "transitional housing, sleeping outside, losing my home, encampment."
        ),
        "keywords": [
            "homeless", "shelter", "housing", "eviction", "sleep", "transitional",
            "street", "encampment", "losing my home", "no place to stay",
        ],
    },
    "dv": {
        "label": "Domestic violence or feeling unsafe at home",
        "description": (
            "Domestic violence, intimate partner violence, physical abuse, emotional abuse, "
            "sexual assault, stalking, unsafe relationship, need to leave my partner, restraining order."
        ),
        "keywords": [
            "domestic violence", "abuse", "unsafe", "partner", "assault", "stalking",
            "escape", "leave", "hitting", "threatening", "sexual assault", "rape",
        ],
    },
    "youth": {
        "label": "Youth or teen services",
        "description": (
            "Child, teenager, youth, under 18, minor, teen mental health, juvenile, "
            "young person, school crisis, runaway youth, foster care."
        ),
        "keywords": [
            "teen", "teenager", "youth", "child", "minor", "young", "kid",
            "juvenile", "school", "runaway", "foster", "under 18",
        ],
    },
    "veteran": {
        "label": "Veteran services",
        "description": (
            "Military veteran, active duty service member, VA services, PTSD, combat trauma, "
            "veteran mental health, veteran suicide, military sexual trauma, Guard, Reserve."
        ),
        "keywords": [
            "veteran", "military", "army", "navy", "marines", "combat", "PTSD",
            "VA", "service member", "deployed", "discharge", "active duty",
        ],
    },
}

CAT_KEYS = list(CATEGORIES.keys())


# ---------------------------------------------------------------------------
# Zero-shot classifier (Phase 1)
# ---------------------------------------------------------------------------

class ZeroShotClassifier:
    """
    Encodes a 'prototype' string for each category and classifies new text
    by cosine similarity.  No training data required.
    """

    def __init__(self, model_name: str = "all-MiniLM-L6-v2"):
        self.model_name = model_name
        self.model = None
        self.cat_embeddings = None  # shape: (n_categories, embedding_dim)

    def load(self) -> None:
        from sentence_transformers import SentenceTransformer

        logger.info(f"Loading sentence-transformer: {self.model_name}")
        self.model = SentenceTransformer(self.model_name)

        prototypes = [
            f"{info['label']}. {info['description']} "
            f"Keywords: {', '.join(info['keywords'])}."
            for info in CATEGORIES.values()
        ]
        self.cat_embeddings = self.model.encode(
            prototypes, convert_to_tensor=True, normalize_embeddings=True
        )
        logger.info("Category embeddings computed.")

    def predict(self, text: str, top_k: int = 3) -> list[dict]:
        from sentence_transformers import util

        if self.model is None or self.cat_embeddings is None:
            raise RuntimeError("Classifier not loaded. Call load() first.")

        emb = self.model.encode(text.strip(), convert_to_tensor=True, normalize_embeddings=True)
        sims = util.cos_sim(emb, self.cat_embeddings)[0]
        indices = sims.argsort(descending=True)[:top_k].tolist()

        return [
            {
                "category": CAT_KEYS[i],
                "label": CATEGORIES[CAT_KEYS[i]]["label"],
                "score": float(sims[i]),
            }
            for i in indices
        ]


# ---------------------------------------------------------------------------
# Trained classifier (Phase 2) — drop-in replacement once data arrives
# ---------------------------------------------------------------------------

class TrainedClassifier:
    """
    Wraps a scikit-learn LogisticRegression (or any sklearn estimator)
    trained on sentence embeddings of CAHOOTS / labelled intake data.

    Training script: ml/train.py
    Artifacts produced: ml/artifacts/model.joblib + label_encoder.joblib
    """

    def __init__(self, model_path: str, encoder_path: str, embed_model: str = "all-MiniLM-L6-v2"):
        self.model_path   = model_path
        self.encoder_path = encoder_path
        self.embed_model  = embed_model
        self.clf     = None
        self.encoder = None
        self.embedder = None

    def load(self) -> None:
        import joblib
        from sentence_transformers import SentenceTransformer

        self.clf     = joblib.load(self.model_path)
        self.encoder = joblib.load(self.encoder_path)
        self.embedder = SentenceTransformer(self.embed_model)
        logger.info(f"Trained classifier loaded from {self.model_path}")

    def predict(self, text: str, top_k: int = 3) -> list[dict]:
        import numpy as np

        emb = self.embedder.encode([text.strip()])
        proba = self.clf.predict_proba(emb)[0]
        top_indices = np.argsort(proba)[::-1][:top_k]

        return [
            {
                "category": self.encoder.inverse_transform([i])[0],
                "label": CATEGORIES.get(self.encoder.inverse_transform([i])[0], {}).get("label", ""),
                "score": float(proba[i]),
            }
            for i in top_indices
        ]


# ---------------------------------------------------------------------------
# Facade — automatically selects the right classifier at startup
# ---------------------------------------------------------------------------

class IntakeClassifier:
    """
    Public interface.  Selects TrainedClassifier when model artifacts exist
    (CLASSIFIER_MODEL_PATH env var), otherwise falls back to ZeroShotClassifier.
    """

    def __init__(self) -> None:
        self._impl = None
        self._loaded = False

    def load(self) -> None:
        model_path   = os.getenv("CLASSIFIER_MODEL_PATH", "")
        encoder_path = os.getenv("CLASSIFIER_ENCODER_PATH", "")

        if model_path and Path(model_path).exists():
            logger.info("Using trained classifier.")
            self._impl = TrainedClassifier(model_path, encoder_path)
        else:
            logger.info("No trained model found; using zero-shot classifier.")
            self._impl = ZeroShotClassifier()

        self._impl.load()
        self._loaded = True

    # -- public API -----------------------------------------------------------

    def classify_text(self, text: str, top_k: int = 3) -> list[dict]:
        """Classify free text. Returns ranked list of {category, label, score}."""
        self._ensure_loaded()
        return self._impl.predict(text, top_k=top_k)

    def classify_intake(
        self,
        what: Optional[str] = None,
        free_text: Optional[str] = None,
    ) -> str:
        """
        Return a single category string given structured wizard input
        and/or free text.

        Priority:
          1. If `what` is a valid category key (user picked from wizard) → use it.
          2. If `free_text` is provided → run ML, use top result if score > threshold.
          3. Default to "talk".
        """
        if what and what in CATEGORIES:
            return what

        if free_text and free_text.strip():
            self._ensure_loaded()
            preds = self._impl.predict(free_text, top_k=1)
            if preds and preds[0]["score"] >= 0.30:
                return preds[0]["category"]

        return "talk"

    # -- helpers --------------------------------------------------------------

    def _ensure_loaded(self) -> None:
        if not self._loaded:
            self.load()

    @property
    def categories(self) -> dict:
        return CATEGORIES


# Module-level singleton
classifier = IntakeClassifier()
