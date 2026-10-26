"use client";

import type { IntakeResponse, IntakeState } from "@/lib/types";
import ResourceCard from "../ResourceCard";

interface Props {
  results: IntakeResponse;
  intake:  IntakeState;
  onBack:  () => void;
}

export default function ResultsScreen({ results, intake, onBack }: Props) {
  const forOther = intake.who === "other";

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: 22 }}>
        <h2 style={{ fontFamily: "var(--font-d)", fontSize: "1.5rem", fontWeight: 600, lineHeight: 1.2, marginBottom: 5 }}>
          {forOther ? "Resources for the person you're supporting" : "Resources for you"}
        </h2>
        <p style={{ fontSize: "0.85rem", color: "var(--fg-muted)" }}>
          {results.category_label} in Lane County
          {intake.urg === "now" ? ", sorted by 24/7 availability" : ""}.
        </p>
      </div>

      {/* Crisis resources (when urg == "now" and category != "crisis") */}
      {results.crisis_resources.length > 0 && (
        <>
          <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--red)", marginBottom: 9 }}>
            🔴 Immediate crisis lines
          </div>
          {results.crisis_resources.map((r, i) => <ResourceCard key={i} r={r} />)}
        </>
      )}

      {/* Main resources */}
      <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 9, marginTop: results.crisis_resources.length ? 22 : 0 }}>
        📍 {results.category_label} in Lane County
      </div>
      {results.resources.map((r, i) => <ResourceCard key={i} r={r} />)}

      <div style={{ marginBottom: 20 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: "var(--fg-muted)", fontSize: "0.88rem", cursor: "pointer", padding: "8px 0", display: "flex", alignItems: "center", gap: 5 }}>
          ← Change my answers
        </button>
      </div>

      <div style={{ borderTop: "1px solid var(--border)", paddingBlock: "18px 22px", marginTop: 12 }}>
        <p style={{ fontSize: "0.75rem", color: "var(--fg-muted)", lineHeight: 1.65, textAlign: "center" }}>
          Information updated regularly. Always confirm details with each organization directly.{" "}
          <a href="https://www.lanecounty.org/government/departments/health_and_human_services/behavioral_health" target="_blank" rel="noopener noreferrer">Lane County BH</a>
          {" · "}
          <a href="https://whitebirdclinic.org" target="_blank" rel="noopener noreferrer">White Bird Clinic</a>
          {" · "}
          <a href="https://ccceugene.org/resources-and-emergency-services" target="_blank" rel="noopener noreferrer">CCC Eugene Resources</a>
        </p>
      </div>
    </div>
  );
}
