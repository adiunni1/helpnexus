"use client";

interface Props {
  onBack:     () => void;
  onNext:     () => void;
  nextLabel?: string;
  disabled?:  boolean;
}

export default function NavRow({ onBack, onNext, nextLabel = "Continue →", disabled }: Props) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBlock: "16px 24px", marginTop: "auto" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: "var(--fg-muted)", fontSize: "0.88rem", cursor: "pointer", padding: "8px 0", display: "flex", alignItems: "center", gap: 5 }}>
        ← Back
      </button>
      <button
        onClick={onNext}
        disabled={disabled}
        style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          padding: "12px 24px", borderRadius: 8, border: "none",
          background: disabled ? "var(--border)" : "var(--accent)",
          color: disabled ? "var(--fg-muted)" : "#fff",
          fontSize: "0.95rem", fontWeight: 600,
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        {nextLabel}
      </button>
    </div>
  );
}
