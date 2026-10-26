// ── Intake wizard state ────────────────────────────────────────────────────

export type WhoValue  = "self" | "other";
export type WhatValue = "crisis" | "mobile" | "talk" | "substances" | "housing" | "dv" | "youth" | "veteran";
export type UrgValue  = "now" | "today" | "week";

export interface IntakeState {
  who:  WhoValue  | null;
  what: WhatValue | null;
  urg:  UrgValue  | null;
  freeText?: string;
}

// ── API types (mirror backend Pydantic schemas) ────────────────────────────

export interface ResourceAction {
  t: "call" | "sms" | "web";
  l: string;         // display label
  n?: string;        // phone digits
  u?: string;        // URL
}

export interface Resource {
  icon:    string;
  urg:     boolean;
  name:    string;
  org:     string;
  desc:    string;
  avail:   string;
  actions: ResourceAction[];
}

export interface IntakeRequest {
  who?:       WhoValue;
  what?:      WhatValue;
  urg?:       UrgValue;
  free_text?: string;
}

export interface IntakeResponse {
  category:         string;
  category_label:   string;
  resources:        Resource[];
  crisis_resources: Resource[];
}

export interface ClassifyPrediction {
  category: string;
  label:    string;
  score:    number;
}

export interface ClassifyResponse {
  predictions: ClassifyPrediction[];
}
