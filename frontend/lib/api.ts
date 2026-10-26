import type {
  IntakeRequest,
  IntakeResponse,
  ClassifyResponse,
} from "./types";

// In dev, Next.js rewrites /api/* → FastAPI backend.
// In production, set NEXT_PUBLIC_API_URL (or use Vercel rewrites).
const BASE = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1`
  : "/api/v1";

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(body),
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText);
    throw new Error(`API ${path} failed (${res.status}): ${msg}`);
  }
  return res.json() as Promise<T>;
}

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`API GET ${path} failed (${res.status})`);
  return res.json() as Promise<T>;
}

// ── Public API surface ─────────────────────────────────────────────────────

/** Submit wizard answers and receive matched resources. */
export const submitIntake = (req: IntakeRequest): Promise<IntakeResponse> =>
  post<IntakeResponse>("/intake", req);

/** Run ML classification on free text (used for the optional text field). */
export const classifyText = (text: string): Promise<ClassifyResponse> =>
  post<ClassifyResponse>("/classify", { text, top_k: 3 });

/** Fetch all resources for a category slug. */
export const getResources = (category: string) =>
  get<{ category: string; resources: unknown[] }>(`/resources/${category}`);
