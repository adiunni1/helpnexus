# HelpNexus

A full-stack web app connecting people to mental health, crisis, housing, and community support, starting in Eugene / Lane County, Oregon.
=======
A full-stack web app that routes people to the right mental health, crisis, housing, and community support services in **Eugene / Lane County, Oregon**, built on the CAHOOTS model of care.
[
Try it here: https://helpnexus.vercel.app

>>>>>>> a83168f14c7757e6e39ff71464a425030151feeb

---

## Stack

| Layer      | Technology |
|------------|-----------|
| Frontend   | Next.js 15, React 19, TypeScript |
| Backend    | FastAPI (Python 3.12), Pydantic v2 |
| ML         | `sentence-transformers` (zero-shot → trained classifier) |
| Deployment | Vercel (frontend) + AWS Lambda / ECS (backend) |

---

## Quick start (Docker Compose)

```bash
git clone <your-repo>
cd resource-finder

# Start both services (first run downloads the sentence-transformer model ~90 MB)
docker compose up

# Frontend → http://localhost:3000
# Backend API docs → http://localhost:8000/docs
```

---

## Project structure

```
resource-finder/
├── frontend/                 # Next.js app
│   ├── app/                  # App Router (layout, page)
│   ├── components/
│   │   ├── ResourceFinder.tsx   # Wizard orchestrator
│   │   ├── ChoiceCard.tsx
│   │   ├── ResourceCard.tsx
│   │   ├── NavRow.tsx
│   │   ├── ProgressBar.tsx
│   │   └── screens/          # One file per wizard screen
│   └── lib/
│       ├── api.ts            # Typed API client
│       └── types.ts          # Shared TypeScript interfaces
│
├── backend/
│   ├── app/
│   │   ├── main.py           # FastAPI app + CORS + lifespan
│   │   ├── routers/
│   │   │   ├── classify.py   # POST /intake, POST /classify
│   │   │   └── resources.py  # GET /resources/{category}
│   │   ├── services/
│   │   │   ├── classifier.py      # Zero-shot + trained classifier
│   │   │   └── resource_service.py
│   │   ├── models/schemas.py      # Pydantic schemas
│   │   └── data/resources.json    # Resource database
│   ├── requirements.txt
│   ├── Dockerfile
│   └── handler.py            # AWS Lambda entry (Mangum)
│
└── ml/
    └── train.py              # Phase 2: train on CAHOOTS CSV data
```

---

## API endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET`  | `/health` | Health check |
| `POST` | `/api/v1/intake` | Submit wizard answers → get resources |
| `POST` | `/api/v1/classify` | ML text classification |
| `GET`  | `/api/v1/resources/{category}` | List resources by category |
| `GET`  | `/api/v1/resources/` | List valid category slugs |

Interactive docs: `http://localhost:8000/docs`

---

## ML classifier

**Phase 1 (now — zero-shot):**  
No training data required. Encodes the user's free text with `all-MiniLM-L6-v2` and compares it against prototype embeddings for each of the 8 intake categories.

**Phase 2 (once CAHOOTS CSV data is available):**  
Run `ml/train.py` on labelled intake CSV data. Artifacts saved to `ml/artifacts/`. Point the backend to them via env vars:

```bash
CLASSIFIER_MODEL_PATH=ml/artifacts/model.joblib
CLASSIFIER_ENCODER_PATH=ml/artifacts/label_encoder.joblib
```

The backend automatically switches to the trained classifier when these paths exist.

---

## Deployment

**Frontend (Vercel):**
```bash
cd frontend && vercel deploy
```
Set `NEXT_PUBLIC_API_URL` to your backend URL in the Vercel dashboard.

**Backend (AWS Lambda):**
```bash
# Install Mangum (already in requirements.txt)
cd backend
zip -r function.zip app/ handler.py requirements.txt
# Upload to Lambda; handler: handler.handler
# Add API Gateway trigger
```

Or deploy as a container on **ECS Fargate** using the provided `Dockerfile`.

---

## Resource categories

| Slug | Label |
|------|-------|
| `crisis` | Crisis or thoughts of self-harm |
| `mobile` | Mobile crisis response |
| `talk` | Emotional support or counseling |
| `substances` | Substance use or addiction |
| `housing` | Housing or shelter |
| `dv` | Domestic violence or feeling unsafe at home |
| `youth` | Youth or teen services |
| `veteran` | Veteran services |

Resources are stored in `backend/app/data/resources.json` — update them there.

---

## Background

Inspired by [CAHOOTS](https://whitebirdclinic.org/cahoots/) (Crisis Assistance Helping Out On The Streets), Eugene's co-responder mobile crisis program. Following CAHOOTS' 2025 suspension, Lane County has a real gap in mental health crisis routing — this app aims to fill part of that gap by helping people find the right service quickly.
