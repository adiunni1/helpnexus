"use client";

import { motion } from "framer-motion";
import type { IntakeResponse, IntakeState } from "@/lib/types";
import ResourceCard from "../ResourceCard";

interface Props {
  results: IntakeResponse;
  intake:  IntakeState;
  onBack:  () => void;
}

const listVariants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.07 } },
} as const;
const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 340, damping: 28 } },
} as const;

export default function ResultsScreen({ results, intake, onBack }: Props) {
  const forOther = intake.who === "other";

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 340, damping: 28 }}
        style={{ marginBottom: 26 }}
      >
        <h2 style={{
          fontFamily: "var(--font-d)",
          fontSize: "clamp(1.35rem, 4.5vw, 1.75rem)",
          fontWeight: 600, lineHeight: 1.18,
          letterSpacing: "-0.01em",
          marginBottom: 6,
        }}>
          {forOther ? "Resources for the person you're supporting" : "Resources for you"}
        </h2>
        <p style={{ fontSize: "0.85rem", color: "var(--fg-muted)" }}>
          {results.category_label} in Lane County
          {intake.urg === "now" ? ", sorted by 24/7 availability" : ""}.
        </p>
      </motion.div>

      {/* Crisis resources */}
      {results.crisis_resources.length > 0 && (
        <>
          <SectionLabel color="var(--red)" icon="🔴" text="Immediate crisis lines" />
          <motion.div variants={listVariants} initial="hidden" animate="show">
            {results.crisis_resources.map((r, i) => (
              <motion.div key={i} variants={itemVariants}>
                <ResourceCard r={r} />
              </motion.div>
            ))}
          </motion.div>
          <div style={{ height: 20 }} />
        </>
      )}

      {/* Main resources */}
      <SectionLabel
        color="var(--accent)"
        icon="📍"
        text={`${results.category_label} in Lane County`}
      />
      <motion.div variants={listVariants} initial="hidden" animate="show">
        {results.resources.map((r, i) => (
          <motion.div key={i} variants={itemVariants}>
            <ResourceCard r={r} />
          </motion.div>
        ))}
      </motion.div>

      {/* Change answers */}
      <div style={{ marginBlock: "8px 4px" }}>
        <button
          onClick={onBack}
          style={{
            background: "none", border: "none", color: "var(--fg-muted)",
            fontSize: "0.88rem", cursor: "pointer", padding: "8px 0",
            display: "flex", alignItems: "center", gap: 6,
            transition: "color 0.12s",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M11 7H3M7 3L3 7l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Change my answers
        </button>
      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid var(--border)", paddingBlock: "18px 24px", marginTop: 14 }}>
        <p style={{ fontSize: "0.76rem", color: "var(--fg-muted)", lineHeight: 1.65, textAlign: "center" }}>
          Information updated regularly. Always confirm details with each organization directly.{" "}
          <a href="https://www.lanecounty.org/government/departments/health_and_human_services/behavioral_health" target="_blank" rel="noopener noreferrer">Lane County BH</a>
          {" · "}
          <a href="https://whitebirdclinic.org" target="_blank" rel="noopener noreferrer">White Bird Clinic</a>
          {" · "}
          <a href="https://ccceugene.org/resources-and-emergency-services" target="_blank" rel="noopener noreferrer">CCC Eugene</a>
        </p>
      </div>
    </div>
  );
}

function SectionLabel({ color, icon, text }: { color: string; icon: string; text: string }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 7,
      fontSize: "0.73rem", fontWeight: 700,
      color, marginBottom: 10,
      textTransform: "uppercase", letterSpacing: "0.06em",
    }}>
      <span>{icon}</span>
      {text}
    </div>
  );
}
