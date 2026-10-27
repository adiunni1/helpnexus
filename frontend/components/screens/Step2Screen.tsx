"use client";

import { motion } from "framer-motion";
import type { IntakeState, WhatValue } from "@/lib/types";
import ChoiceCard from "../ChoiceCard";
import NavRow from "../NavRow";
import { StepLabel, headingStyle, subStyle } from "./Step1Screen";

interface Props {
  intake: IntakeState;
  onSet:  (v: WhatValue) => void;
  onBack: () => void;
  onNext: () => void;
}

const OPTIONS: { value: WhatValue; icon: string; title: string; sub: string }[] = [
  { value: "crisis",     icon: "🆘", title: "Crisis or thoughts of self-harm",           sub: "Feeling unsafe, suicidal thoughts, or in emotional crisis" },
  { value: "mobile",     icon: "🚐", title: "I need someone to come to me",               sub: "Mobile crisis team, a non-police responder who comes in person" },
  { value: "talk",       icon: "💬", title: "Emotional support or someone to talk to",    sub: "Peer support, counseling, or just needing to be heard" },
  { value: "substances", icon: "🌿", title: "Substance use or addiction",                 sub: "Help with alcohol, drugs, or substance-related challenges" },
  { value: "housing",    icon: "🏠", title: "Housing or shelter",                         sub: "Emergency shelter, transitional housing, or homelessness support" },
  { value: "dv",         icon: "🛡️", title: "Domestic violence or feeling unsafe at home", sub: "Escaping an unsafe relationship or creating a safety plan" },
  { value: "youth",      icon: "⭐", title: "Youth or teen services",                    sub: "Services specifically for young people under 18" },
  { value: "veteran",    icon: "🎖️", title: "Veteran services",                          sub: "Mental health or crisis support specifically for veterans" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  show:   (i: number) => ({
    opacity: 1, y: 0,
    transition: { type: "spring" as const, stiffness: 380, damping: 32, delay: i * 0.05 },
  }),
};

export default function Step2Screen({ intake, onSet, onBack, onNext }: Props) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <StepLabel current={2} total={3} />
      <h2 style={headingStyle}>What kind of support are you looking for?</h2>
      <p style={subStyle}>Choose the option that best fits the situation.</p>

      <div style={{ display: "grid", gap: 9, marginBottom: 20 }}>
        {OPTIONS.map((o, i) => (
          <motion.div key={o.value} custom={i} variants={cardVariants} initial="hidden" animate="show">
            <ChoiceCard
              icon={o.icon} title={o.title} subtitle={o.sub}
              selected={intake.what === o.value}
              onClick={() => onSet(o.value)}
            />
          </motion.div>
        ))}
      </div>

      <NavRow onBack={onBack} onNext={onNext} />
    </div>
  );
}
