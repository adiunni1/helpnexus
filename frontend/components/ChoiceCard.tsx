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
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "18px 20px",
        minHeight: 82,
        background: selected ? "var(--accent-lite)" : "var(--bg-card)",
        border: `2px solid ${selected ? "var(--accent)" : "var(--border)"}`,
        borderRadius: "var(--r)",
        cursor: "pointer",
        textAlign: "left",
        width: "100%",
        boxShadow: selected
          ? `0 0 0 3px rgba(30,102,64,0.1), var(--shadow-sm)`
          : "var(--shadow-sm)",
        transition: "border-color 0.15s, background 0.15s, box-shadow 0.18s",
      }}
    >
      {/* Icon bubble */}
      <div style={{
        width: 52,
        height: 52,
        borderRadius: 16,
        flexShrink: 0,
        background: selected ? "var(--accent)" : "var(--bg-alt)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.6rem",
        lineHeight: 1,
        transition: "background 0.15s",
        boxShadow: selected ? "0 3px 10px rgba(30,102,64,0.22)" : "none",
      }}>
        {icon}
      </div>

      {/* Text block */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: "0.98rem",
          fontWeight: 600,
          color: "var(--fg)",
          lineHeight: 1.25,
          marginBottom: 4,
        }}>
          {title}
        </div>
        <div style={{
          fontSize: "0.81rem",
          color: "var(--fg-muted)",
          lineHeight: 1.45,
        }}>
          {subtitle}
        </div>
      </div>

      {/* Selection indicator */}
      <div style={{
        width: 22,
        height: 22,
        borderRadius: "50%",
        flexShrink: 0,
        border: `2px solid ${selected ? "var(--accent)" : "var(--border)"}`,
        background: selected ? "var(--accent)" : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.15s cubic-bezier(0.22,1,0.36,1)",
        boxShadow: selected ? "0 0 0 3px rgba(30,102,64,0.18)" : "none",
      }}>
        {selected && (
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
            <path
              d="M2 5.5l2.5 2.5L9 3"
              stroke="#fff"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </button>
  );
}
