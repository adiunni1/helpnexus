"use client";

interface Props {
  onBack:     () => void;
  onNext:     () => void;
  nextLabel?: string;
  disabled?:  boolean;
}

export default function NavRow({ onBack, onNext, nextLabel = "Continue", disabled }: Props) {
  return (
    <div className="nav-row-wrap">
      {/* Continue — full-width on mobile, auto-width on desktop */}
      <button
        className="btn-primary btn-nav-continue"
        onClick={onNext}
        disabled={disabled}
        style={{
          padding: "15px 28px",
          borderRadius: 100,
          border: "none",
          background: disabled ? "var(--border)" : "var(--grad-accent)",
          color: disabled ? "var(--fg-muted)" : "#fff",
          fontSize: "1rem",
          fontWeight: 600,
          cursor: disabled ? "not-allowed" : "pointer",
          boxShadow: disabled ? "none" : "0 4px 18px rgba(30,102,64,0.3)",
          gap: 8,
        }}
      >
        {nextLabel}
        {!disabled && (
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden style={{ marginLeft: 4 }}>
            <path d="M4 8.5h9M9.5 5l3.5 3.5-3.5 3.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      {/* Back — centered text link on mobile */}
      <button
        className="btn-ghost nav-row-back"
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          color: "var(--fg-muted)",
          fontSize: "0.88rem",
          fontWeight: 500,
          cursor: "pointer",
          padding: "6px 4px",
        }}
      >
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
          <path d="M11 7.5H4M7 4L4 7.5l3 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back
      </button>
    </div>
  );
}
