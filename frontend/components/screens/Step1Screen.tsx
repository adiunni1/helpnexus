"use client";

import { motion } from "framer-motion";
import type { IntakeState, WhoValue } from "@/lib/types";
import ChoiceCard from "../ChoiceCard";
import NavRow from "../NavRow";

interface Props {
  intake: IntakeState;
  onSet:  (v: WhoValue) => void;
  onBack: () => void;
  onNext: () => void;
}

const OPTIONS: { value: WhoValue; icon: string; title: string; sub: string }[] = [
  { value: "self",  icon: "🙋", title: "Myself",       sub: "I'm looking for help or support for me" },
  { value: "other", icon: "🤝", title: "Someone else", sub: "A friend, family member, or someone I'm worried about" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  show:   (i: number) => ({
    opacity: 1, y: 0,
    transition: { type: "spring" as const, stiffness: 360, damping: 30, delay: i * 0.07 },
  }),
};

export default function Step1Screen({ intake, onSet, onBack, onNext }: Props) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <StepLabel current={1} total={3} />
      <h2 style={headingStyle}>Who are you looking for help for?</h2>
      <p style={subStyle}>This helps us tailor the resources to your situation.</p>

      <div style={{ display: "grid", gap: 9, marginBottom: 20 }}>
        {OPTIONS.map((o, i) => (
          <motion.div key={o.value} custom={i} variants={cardVariants} initial="hidden" animate="show">
            <ChoiceCard
              icon={o.icon} title={o.title} subtitle={o.sub}
              selected={intake.who === o.value}
              onClick={() => onSet(o.value)}
            />
          </motion.div>
        ))}
      </div>

      <NavRow onBack={onBack} onNext={onNext} />
    </div>
  );
}

function StepLabel({ current, total }: { current: number; total: number }) {
  return (
    <div style={{
      fontSize: "0.78rem", fontWeight: 600, color: "var(--accent)",
      marginBottom: 10, display: "flex", alignItems: "center", gap: 8,
    }}>
      <span style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 22, height: 22, borderRadius: "50%",
        background: "var(--accent)", color: "#fff",
        fontSize: "0.7rem", fontWeight: 700,
      }}>
        {current}
      </span>
      <span style={{ color: "var(--fg-muted)" }}>of {total}</span>
    </div>
  );
}

const headingStyle: React.CSSProperties = {
  fontFamily: "var(--font-d)",
  fontSize: "clamp(1.35rem, 4.5vw, 1.75rem)",
  fontWeight: 600, lineHeight: 1.20,
  letterSpacing: "-0.01em",
  marginBottom: 8,
};

const subStyle: React.CSSProperties = {
  color: "var(--fg-muted)", fontSize: "0.9rem", marginBottom: 28,
};

export { StepLabel, headingStyle, subStyle };
