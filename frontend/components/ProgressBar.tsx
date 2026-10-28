"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";

// Maps PROGRESS value → step number (1-3). Returns null on landing / results.
const STEP_FROM_VALUE: Record<number, number> = { 30: 1, 62: 2, 88: 3 };

export default function ProgressBar({ value }: { value: number }) {
  const step = STEP_FROM_VALUE[value];
  if (!step) return null;

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      paddingBlock: "18px 22px",
      paddingInline: 4,
      gap: 0,
    }}>
      {[1, 2, 3].map((i) => (
        <Fragment key={i}>
          {/* Connector line between dots */}
          {i > 1 && (
            <div style={{
              flex: 1,
              height: 2,
              borderRadius: 1,
              background: step > i - 1 ? "var(--accent)" : "var(--border)",
              transition: "background 0.35s cubic-bezier(0.22,1,0.36,1)",
              margin: "0 2px",
            }} />
          )}

          {/* Step dot */}
          <motion.div
            initial={false}
            animate={{
              background: step >= i ? "var(--accent)" : "transparent",
              borderColor: step >= i ? "var(--accent)" : "var(--border)",
            }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: 30, height: 30,
              borderRadius: "50%",
              border: "2px solid",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              fontSize: "0.75rem",
              fontWeight: 700,
              color: step >= i ? "#fff" : "var(--fg-muted)",
            }}
          >
            {step > i ? (
              /* Checkmark for completed steps */
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path
                  d="M2 6.5l2.8 2.8L10 3"
                  stroke="#fff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : i}
          </motion.div>
        </Fragment>
      ))}
    </div>
  );
}
