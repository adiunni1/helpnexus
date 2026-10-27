"use client";

interface Props {
  onBack:     () => void;
  onNext:     () => void;
  nextLabel?: string;
  disabled?:  boolean;
}

export default function NavRow({ onBack, onNext, nextLabel = "Continue", disabled }: Props) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      paddingBlock: "20px 28px", marginTop: "auto",
    }}>
      <button
        className="btn-ghost"
        onClick={onBack}
        style={{
          background: "none", border: "none", color: "var(--fg-muted)",
          fontSize: "0.9rem", fontWeight: 500, cursor: "pointer",
          padding: "8px 0", display: "flex", alignItems: "center", gap: 6,
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M12 8H4M8 4L4 8l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back
      </button>

      <button
        className="btn-primary"
        onClick={onNext}
        disabled={disabled}
        style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "13px 26px", borderRadius: 100, border: "none",
          background: disabled ? "var(--border)" : "var(--grad-accent)",
          color: disabled ? "var(--fg-muted)" : "#fff",
          fontSize: "0.95rem", fontWeight: 600,
          cursor: disabled ? "not-allowed" : "pointer",
          boxShadow: disabled ? "none" : "0 4px 16px rgba(30,102,64,0.28)",
        }}
      >
        {nextLabel}
        {!disabled && (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>
    </div>
  );
}
