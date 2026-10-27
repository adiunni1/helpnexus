"use client";

import { motion } from "framer-motion";

export default function ProgressBar({ value }: { value: number }) {
  return (
    <div style={{ height: 3, background: "var(--border)", borderRadius: 3, marginBottom: 32, overflow: "visible", position: "relative" }}>
      <motion.div
        style={{
          height: "100%",
          background: "var(--grad-accent)",
          borderRadius: 3,
          originX: 0,
          position: "relative",
        }}
        animate={{ width: `${value}%` }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
      >
        {/* Glowing endpoint dot */}
        {value > 0 && value < 100 && (
          <div style={{
            position: "absolute", right: -4, top: "50%", transform: "translateY(-50%)",
            width: 8, height: 8, borderRadius: "50%",
            background: "var(--accent-2)",
            boxShadow: "0 0 8px rgba(45,148,85,0.6)",
          }} />
        )}
      </motion.div>
    </div>
  );
}
