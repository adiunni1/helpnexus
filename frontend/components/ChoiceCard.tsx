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
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: "14px 16px",
        background: selected ? "var(--accent-lite)" : "var(--bg-card)",
        border: `1.5px solid ${selected ? "var(--accent)" : "var(--border)"}`,
        borderRadius: "var(--r)", cursor: "pointer", textAlign: "left", width: "100%",
        transition: "border-color 0.14s, background 0.14s",
      }}
    >
      <span style={{ fontSize: "1.45rem", flexShrink: 0, width: 36, textAlign: "center" }}>{icon}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: "0.93rem", fontWeight: 600, color: "var(--fg)", lineHeight: 1.3, marginBottom: 2 }}>{title}</div>
        <div style={{ fontSize: "0.78rem", color: "var(--fg-muted)", lineHeight: 1.4 }}>{subtitle}</div>
      </div>
      <div style={{
        width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
        border: `2px solid ${selected ? "var(--accent)" : "var(--border)"}`,
        background: selected ? "var(--accent)" : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.14s",
      }}>
        {selected && <div style={{ width: 6, height: 6, background: "#fff", borderRadius: "50%" }} />}
      </div>
    </button>
  );
}
