"use client";

import type { IntakeState, UrgValue } from "@/lib/types";
import NavRow from "../NavRow";

interface Props {
  intake:  IntakeState;
  onSet:   (v: UrgValue) => void;
  onBack:  () => void;
  onNext:  () => void;
  loading: boolean;
  error:   string | null;
}

const OPTIONS: { value: UrgValue; icon: string; label: string; sub: string; isUrgent?: boolean }[] = [
  { value: "now",   icon: "🔴", label: "Right now",  sub: "Active crisis, need help immediately", isUrgent: true },
  { value: "today", icon: "🟡", label: "Today",      sub: "Urgent, but not a life-threatening emergency" },
  { value: "week",  icon: "🟢", label: "This week",  sub: "Planning ahead or building support" },
];

export default function Step3Screen({ intake, onSet, onBack, onNext, loading, error }: Props) {
  const showCrisis = intake.urg === "now";

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: 6, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)" }}>
        Step 3 of 3
      </div>
      <h2 style={{ fontFamily: "var(--font-d)", fontSize: "clamp(1.3rem, 4vw, 1.65rem)", fontWeight: 600, lineHeight: 1.22, marginBottom: 6 }}>
        How urgent is this right now?
      </h2>
      <p style={{ color: "var(--fg-muted)", fontSize: "0.88rem", marginBottom: 26 }}>
        This helps us prioritize which resources to show first.
      </p>

      {/* Urgency grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 9, marginBottom: 22 }}>
        {OPTIONS.map(o => {
          const sel = intake.urg === o.value;
          return (
            <button
              key={o.value}
              onClick={() => onSet(o.value)}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                padding: "18px 10px",
                background: sel ? (o.isUrgent ? "var(--amber-lite)" : "var(--accent-lite)") : "var(--bg-card)",
                border: `1.5px solid ${sel ? (o.isUrgent ? "var(--amber)" : "var(--accent)") : "var(--border)"}`,
                borderRadius: "var(--r)", cursor: "pointer", textAlign: "center",
              }}
            >
              <span style={{ fontSize: "1.6rem" }}>{o.icon}</span>
              <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--fg)" }}>{o.label}</span>
              <span style={{ fontSize: "0.73rem", color: "var(--fg-muted)", lineHeight: 1.3 }}>{o.sub}</span>
            </button>
          );
        })}
      </div>

      {/* Crisis alert */}
      {showCrisis && (
        <div style={{
          background: "var(--red-lite)", border: "1.5px solid var(--red)",
          borderRadius: "var(--r)", padding: "14px 16px",
          display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 16,
        }}>
          <span style={{ fontSize: "1.2rem", flexShrink: 0, marginTop: 1 }}>🚨</span>
          <div style={{ fontSize: "0.83rem", color: "var(--fg)", lineHeight: 1.5 }}>
            <strong style={{ color: "var(--red)", display: "block", fontSize: "0.88rem", marginBottom: 5 }}>
              Please reach out to a crisis line first
            </strong>
            If you or someone you know is in immediate danger, these lines are available right now.
            Free, confidential, 24/7.
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
              {[
                { href: "tel:988",      label: "📞 Call or text 988" },
                { href: "sms:741741",   label: "💬 Text HOME to 741741" },
                { href: "tel:911",      label: "🚨 Call 911" },
              ].map(chip => (
                <a key={chip.href} href={chip.href} style={{
                  display: "inline-block", background: "var(--red)", color: "#fff",
                  fontSize: "0.78rem", fontWeight: 600, padding: "5px 13px",
                  borderRadius: 20, textDecoration: "none",
                }}>
                  {chip.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {error && (
        <p style={{ color: "var(--red)", fontSize: "0.83rem", marginBottom: 12 }}>
          {error}
        </p>
      )}

      <NavRow
        onBack={onBack}
        onNext={onNext}
        nextLabel={loading ? "Loading…" : "See resources →"}
        disabled={loading}
      />
    </div>
  );
}
