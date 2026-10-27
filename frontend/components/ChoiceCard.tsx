"use client";

interface Props {
  icon:     string;
  title:    string;
  subtitle: string;
  selected: boolean;
  onClick:  () => void;
}

export default function ChoiceCard({ icon, title, subtitle, selected, onClick }: Props) {
  return (
    <button
      className="choice-card"
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: "16px 18px",
        background: selected ? "var(--accent-lite)" : "var(--bg-card)",
        border: `1.5px solid ${selected ? "var(--accent)" : "var(--border)"}`,
        borderRadius: "var(--r)", cursor: "pointer", textAlign: "left", width: "100%",
        boxShadow: selected ? `0 0 0 3px rgba(30,102,64,0.08), var(--shadow-sm)` : "var(--shadow-sm)",
      }}
    >
      {/* Icon container */}
      <div style={{
        width: 42, height: 42, borderRadius: 12, flexShrink: 0,
        background: selected ? "var(--accent)" : "var(--bg-alt)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "1.35rem",
        transition: "background 0.15s",
      }}>
        {icon}
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: "0.95rem", fontWeight: 600, color: "var(--fg)",
          lineHeight: 1.3, marginBottom: 3,
        }}>
          {title}
        </div>
        <div style={{ fontSize: "0.8rem", color: "var(--fg-muted)", lineHeight: 1.4 }}>
          {subtitle}
        </div>
      </div>

      {/* Selection indicator */}
      <div style={{
        width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
        border: `2px solid ${selected ? "var(--accent)" : "var(--border)"}`,
        background: selected ? "var(--accent)" : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.15s",
        boxShadow: selected ? "0 0 0 3px rgba(30,102,64,0.15)" : "none",
      }}>
        {selected && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
            <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
    </button>
  );
}
