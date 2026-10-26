"""
Phase 2 training script — run once CAHOOTS CSV data is available.

Usage:
    python ml/train.py \
        --data ml/data/labelled_intake.csv \
        --out  ml/artifacts/

Input CSV columns:
    text      - free-text description of the call / intake situation
    category  - one of: crisis, mobile, talk, substances, housing, dv, youth, veteran

Output artifacts (saved to --out):
    model.joblib          - trained LogisticRegression
    label_encoder.joblib  - sklearn LabelEncoder
    eval_report.txt       - classification report on held-out test set
"""
from __future__ import annotations

import argparse
import json
import logging
from pathlib import Path

import joblib
import pandas as pd
from sentence_transformers import SentenceTransformer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report
from sklearn.model_selection import StratifiedShuffleSplit
from sklearn.preprocessing import LabelEncoder

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

VALID_CATEGORIES = {
    "crisis", "mobile", "talk", "substances",
    "housing", "dv", "youth", "veteran",
}
EMBED_MODEL = "all-MiniLM-L6-v2"


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--data", required=True, help="Path to labelled CSV")
    parser.add_argument("--out",  default="ml/artifacts", help="Output dir for artifacts")
    parser.add_argument("--test-size", type=float, default=0.15)
    args = parser.parse_args()

    out_dir = Path(args.out)
    out_dir.mkdir(parents=True, exist_ok=True)

    # 1. Load data
    df = pd.read_csv(args.data)
    assert "text" in df.columns and "category" in df.columns, \
        "CSV must have 'text' and 'category' columns."

    # Drop rows with unknown categories
    df = df[df["category"].isin(VALID_CATEGORIES)].dropna(subset=["text", "category"])
    logger.info(f"Loaded {len(df)} rows across {df['category'].nunique()} categories.")
    logger.info(df["category"].value_counts().to_string())

    # 2. Encode labels
    le = LabelEncoder()
    y = le.fit_transform(df["category"])

    # 3. Embed texts
    logger.info(f"Embedding texts with {EMBED_MODEL}…")
    model = SentenceTransformer(EMBED_MODEL)
    X = model.encode(df["text"].tolist(), show_progress_bar=True, normalize_embeddings=True)

    # 4. Train / test split (stratified)
    splitter = StratifiedShuffleSplit(n_splits=1, test_size=args.test_size, random_state=42)
    train_idx, test_idx = next(splitter.split(X, y))
    X_train, X_test = X[train_idx], X[test_idx]
    y_train, y_test = y[train_idx], y[test_idx]

    # 5. Train classifier
    logger.info("Training LogisticRegression…")
    clf = LogisticRegression(max_iter=1000, C=5.0, class_weight="balanced")
    clf.fit(X_train, y_train)

    # 6. Evaluate
    y_pred = clf.predict(X_test)
    report = classification_report(y_test, y_pred, target_names=le.classes_)
    logger.info("\n" + report)
    (out_dir / "eval_report.txt").write_text(report)

    # 7. Save artifacts
    joblib.dump(clf, out_dir / "model.joblib")
    joblib.dump(le,  out_dir / "label_encoder.joblib")
    logger.info(f"Artifacts saved to {out_dir}/")

    # 8. Save metadata
    meta = {
        "embed_model": EMBED_MODEL,
        "categories": le.classes_.tolist(),
        "n_train": int(len(train_idx)),
        "n_test":  int(len(test_idx)),
    }
    (out_dir / "meta.json").write_text(json.dumps(meta, indent=2))


if __name__ == "__main__":
    main()
