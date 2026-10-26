"use client";

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

export default function Step1Screen({ intake, onSet, onBack, onNext }: Props) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: 6, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)" }}>
        Step 1 of 3
      </div>
      <h2 style={{ fontFamily: "var(--font-d)", fontSize: "clamp(1.3rem, 4vw, 1.65rem)", fontWeight: 600, lineHeight: 1.22, marginBottom: 6 }}>
        Who are you looking for help for?
      </h2>
      <p style={{ color: "var(--fg-muted)", fontSize: "0.88rem", marginBottom: 26 }}>
        This helps us tailor the resources to your situation.
      </p>
      <div style={{ display: "grid", gap: 9, marginBottom: 20 }}>
        {OPTIONS.map(o => (
          <ChoiceCard
            key={o.value}
            icon={o.icon} title={o.title} subtitle={o.sub}
            selected={intake.who === o.value}
            onClick={() => onSet(o.value)}
          />
        ))}
      </div>
      <NavRow onBack={onBack} onNext={onNext} />
    </div>
  );
}
