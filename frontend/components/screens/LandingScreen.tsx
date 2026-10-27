"use client";

import { motion } from "framer-motion";

const STAGGER = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } } as const;
const ITEM    = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 360, damping: 30 } } } as const;

export default function LandingScreen({ onStart }: { onStart: () => void }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingBlock: "16px 28px", position: "relative" }}>

      {/* Subtle radial glow — purely decorative */}
      <div aria-hidden style={{
        position: "absolute", top: "-80px", left: "50%", transform: "translateX(-50%)",
        width: 440, height: 360,
        background: "radial-gradient(ellipse at center, rgba(30,102,64,0.10) 0%, transparent 68%)",
        pointerEvents: "none",
      }} />

      <motion.div
        variants={STAGGER}
        initial="hidden"
        animate="show"
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* Location badge */}
        <motion.div variants={ITEM} style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          background: "var(--accent-lite)", border: "1px solid var(--border)",
          borderRadius: 100, padding: "5px 14px",
          fontSize: "0.78rem", fontWeight: 600,
          color: "var(--accent)", marginBottom: 24,
        }}>
          <span style={{
            display: "inline-block", width: 7, height: 7, borderRadius: "50%",
            background: "var(--accent)",
          }} />
          Eugene &amp; Lane County, Oregon
        </motion.div>

        {/* Heading */}
        <motion.h1 variants={ITEM} style={{
          fontFamily: "var(--font-d)",
          fontSize: "clamp(2.0rem, 7.5vw, 3rem)",
          fontWeight: 600, lineHeight: 1.10,
          color: "var(--fg)",
          letterSpacing: "-0.02em",
          marginBottom: 20,
        }}>
          Find the right support,<br />right now.
        </motion.h1>

        {/* Description */}
        <motion.p variants={ITEM} style={{
          color: "var(--fg-muted)", fontSize: "1.025rem",
          lineHeight: 1.68, maxWidth: 400, marginBottom: 36,
        }}>
          Answer three quick questions and we&rsquo;ll connect you with crisis services,
          mental health resources, and community support available in your area.
        </motion.p>

        {/* CTA */}
        <motion.div variants={ITEM}>
          <button
            className="btn-primary"
            onClick={onStart}
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "15px 30px", borderRadius: 100, border: "none",
              background: "var(--grad-accent)",
              color: "#fff", fontSize: "1rem", fontWeight: 600,
              cursor: "pointer", letterSpacing: "0.005em",
              boxShadow: "0 4px 20px rgba(30,102,64,0.32)",
            }}
          >
            Get started
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </motion.div>

        {/* Crisis note */}
        <motion.div variants={ITEM} style={{
          background: "var(--amber-lite)",
          borderLeft: "3px solid var(--amber)",
          borderRadius: "0 var(--r) var(--r) 0",
          padding: "15px 18px",
          fontSize: "0.85rem", lineHeight: 1.58,
          color: "var(--fg)", marginTop: 32,
        }}>
          <strong style={{ color: "var(--amber)" }}>In immediate danger?</strong>{" "}
          Call <strong>911</strong>. For a mental health crisis, call or text{" "}
          <strong>988</strong> (Suicide &amp; Crisis Lifeline) — free, confidential, 24/7.
        </motion.div>
      </motion.div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid var(--border)", paddingBlock: "18px 20px", marginTop: "auto", paddingTop: 28 }}>
        <p style={{ fontSize: "0.76rem", color: "var(--fg-muted)", lineHeight: 1.65, textAlign: "center" }}>
          This tool is a community reference, not a crisis line or emergency service.<br />
          Always confirm details directly with each organization.
        </p>
      </div>
    </div>
  );
}
