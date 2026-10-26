"use client";

import type { Resource } from "@/lib/types";

export default function ResourceCard({ r }: { r: Resource }) {
  const is247 = r.avail === "24/7" || r.avail.includes("24/7");

  return (
    <div style={{
      background: "var(--bg-card)", border: "1px solid var(--border)",
      borderRadius: "var(--r)", padding: "15px 16px", marginBottom: 9,
      boxShadow: "var(--shadow)",
    }}>
      {/* Head row */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 11, marginBottom: 8 }}>
        <div style={{
          width: 34, height: 34, background: r.urg ? "var(--amber-lite)" : "var(--accent-lite)",
          borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1rem", flexShrink: 0,
        }}>
          {r.icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: "0.92rem", fontWeight: 600, color: "var(--fg)", lineHeight: 1.3 }}>{r.name}</div>
          <div style={{ fontSize: "0.77rem", color: "var(--fg-muted)", marginTop: 1 }}>{r.org}</div>
        </div>
        <span style={{
          fontSize: "0.7rem", fontWeight: 600, padding: "3px 8px",
          borderRadius: 20, flexShrink: 0, whiteSpace: "nowrap",
          background: is247 ? "var(--accent-lite)" : "var(--bg-alt)",
          color: is247 ? "var(--accent)" : "var(--fg-muted)",
        }}>
          {is247 ? "● 24/7" : r.avail}
        </span>
      </div>

      {/* Description */}
      <p style={{ fontSize: "0.8rem", color: "var(--fg-muted)", lineHeight: 1.55, marginBottom: 11 }}>
        {r.desc}
      </p>

      {/* Action chips */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
        {r.actions.map((a, i) => {
          if (a.t === "web") {
            return (
              <a key={i} href={a.u} target="_blank" rel="noopener noreferrer" style={chipStyle("web")}>
                {a.l}
              </a>
            );
          }
          const digits = (a.n ?? "").replace(/\D/g, "");
          const href   = a.t === "sms" ? `sms:${digits}` : `tel:${digits}`;
          return (
            <a key={i} href={href} style={chipStyle("call")}>
              {a.l}
            </a>
          );
        })}
      </div>
    </div>
  );
}

function chipStyle(type: "call" | "web"): React.CSSProperties {
  return {
    display: "inline-flex", alignItems: "center", gap: 4,
    padding: "6px 13px", borderRadius: 20,
    fontSize: "0.77rem", fontWeight: 600, lineHeight: 1,
    textDecoration: "none", cursor: "pointer",
    background: type === "call" ? "var(--accent-lite)" : "var(--bg-alt)",
    color:      type === "call" ? "var(--accent)"      : "var(--fg-muted)",
  };
}
