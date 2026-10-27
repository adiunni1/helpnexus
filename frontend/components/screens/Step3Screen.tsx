"use client";

import { motion } from "framer-motion";
import type { IntakeState, UrgValue } from "@/lib/types";
import NavRow from "../NavRow";
import { StepLabel, headingStyle, subStyle } from "./Step1Screen";

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
  { value: "today", icon: "🟡", label: "Today",      sub: "Urgent, but not life-threatening" },
  { value: "week",  icon: "🟢", label: "This week",  sub: "Planning ahead or building support" },
];

export default function Step3Screen({ intake, onSet, onBack, onNext, loading, error }: Props) {
  const showCrisis = intake.urg === "now";

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <StepLabel current={3} total={3} />
      <h2 style={headingStyle}>How urgent is this right now?</h2>
      <p style={subStyle}>This helps us prioritize which resources to show first.</p>

      {/* Urgency tiles */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 24 }}>
        {OPTIONS.map((o, i) => {
          const sel = intake.urg === o.value;
          return (
            <motion.button
              key={o.value}
              className="urg-tile"
              onClick={() => onSet(o.value)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 360, damping: 30, delay: i * 0.07 }}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                padding: "20px 10px",
                background: sel ? (o.isUrgent ? "var(--amber-lite)" : "var(--accent-lite)") : "var(--bg-card)",
                border: `1.5px solid ${sel ? (o.isUrgent ? "var(--amber)" : "var(--accent)") : "var(--border)"}`,
                borderRadius: "var(--r)", cursor: "pointer", textAlign: "center",
                boxShadow: sel ? "var(--shadow-md)" : "var(--shadow-sm)",
              }}
            >
              <span style={{ fontSize: "1.75rem", lineHeight: 1 }}>{o.icon}</span>
              <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--fg)", lineHeight: 1.2 }}>
                {o.label}
              </span>
              <span style={{ fontSize: "0.73rem", color: "var(--fg-muted)", lineHeight: 1.35 }}>
                {o.sub}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Crisis banner */}
      {showCrisis && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          style={{
            background: "var(--red-lite)", border: "1.5px solid var(--red)",
            borderRadius: "var(--r)", padding: "16px 18px",
            display: "flex", gap: 13, alignItems: "flex-start", marginBottom: 18, overflow: "hidden",
          }}
        >
          <span style={{ fontSize: "1.25rem", flexShrink: 0, marginTop: 1 }}>🚨</span>
          <div style={{ fontSize: "0.85rem", color: "var(--fg)", lineHeight: 1.55 }}>
            <strong style={{ color: "var(--red)", display: "block", fontSize: "0.9rem", marginBottom: 5 }}>
              Please reach out to a crisis line first
            </strong>
            Free, confidential, 24/7 — these lines are available right now.
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 10 }}>
              {[
                { href: "tel:988",      label: "📞 Call or text 988" },
                { href: "sms:741741",   label: "💬 Text HOME to 741741" },
                { href: "tel:911",      label: "🚨 Call 911" },
              ].map(chip => (
                <a key={chip.href} href={chip.href} style={{
                  display: "inline-block", background: "var(--red)", color: "#fff",
                  fontSize: "0.8rem", fontWeight: 600, padding: "6px 14px",
                  borderRadius: 100, textDecoration: "none",
                  boxShadow: "0 2px 8px rgba(181,48,31,0.28)",
                }}>
                  {chip.label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {error && (
        <p style={{ color: "var(--red)", fontSize: "0.85rem", marginBottom: 14 }}>
          {error}
        </p>
      )}

      <NavRow
        onBack={onBack}
        onNext={onNext}
        nextLabel={loading ? "Loading…" : "See resources"}
        disabled={loading}
      />
    </div>
  );
}
