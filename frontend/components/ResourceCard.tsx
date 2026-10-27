"use client";

import type { Resource } from "@/lib/types";

export default function ResourceCard({ r }: { r: Resource }) {
  const is247 = r.avail === "24/7" || r.avail.includes("24/7");

  return (
    <div
      className="resource-card"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--r)",
        padding: "18px 18px 16px",
        marginBottom: 10,
        boxShadow: "var(--shadow-md)",
      }}
    >
      {/* Head row */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 13, marginBottom: 10 }}>
        <div style={{
          width: 40, height: 40,
          background: r.urg
            ? "linear-gradient(135deg, var(--amber-lite), rgba(179,88,21,0.12))"
            : "linear-gradient(135deg, var(--accent-lite), rgba(30,102,64,0.1))",
          border: `1px solid ${r.urg ? "rgba(179,88,21,0.2)" : "rgba(30,102,64,0.15)"}`,
          borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1.1rem", flexShrink: 0,
        }}>
          {r.icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--fg)", lineHeight: 1.3 }}>
            {r.name}
          </div>
          <div style={{ fontSize: "0.78rem", color: "var(--fg-muted)", marginTop: 2 }}>
            {r.org}
          </div>
        </div>
        <span style={{
          fontSize: "0.72rem", fontWeight: 600,
          padding: "4px 10px", borderRadius: 100, flexShrink: 0, whiteSpace: "nowrap",
          background: is247 ? "var(--accent-lite)" : "var(--bg-alt)",
          color: is247 ? "var(--accent)" : "var(--fg-muted)",
          border: `1px solid ${is247 ? "rgba(30,102,64,0.2)" : "var(--border)"}`,
        }}>
          {is247 ? "● 24/7" : r.avail}
        </span>
      </div>

      {/* Description */}
      <p style={{
        fontSize: "0.82rem", color: "var(--fg-muted)",
        lineHeight: 1.6, marginBottom: 13,
      }}>
        {r.desc}
      </p>

      {/* Action chips */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
        {r.actions.map((a, i) => {
          if (a.t === "web") {
            return (
              <a key={i} href={a.u} target="_blank" rel="noopener noreferrer"
                 className="chip-action"
                 style={chipStyle("web")}>
                {a.l}
              </a>
            );
          }
          const digits = (a.n ?? "").replace(/\D/g, "");
          const href   = a.t === "sms" ? `sms:${digits}` : `tel:${digits}`;
          return (
            <a key={i} href={href} className="chip-action" style={chipStyle("call")}>
              {a.l}
            </a>
          );
        })}
      </div>
    </div>
  );
}

function chipStyle(type: "call" | "web"): React.CSSProperties {
  const isCall = type === "call";
  return {
    display: "inline-flex", alignItems: "center", gap: 5,
    padding: "7px 14px", borderRadius: 100,
    fontSize: "0.79rem", fontWeight: 600, lineHeight: 1,
    textDecoration: "none", cursor: "pointer",
    background: isCall ? "var(--accent)"  : "var(--bg-alt)",
    color:      isCall ? "#fff"           : "var(--fg-muted)",
    border:     isCall ? "none"           : "1px solid var(--border)",
    boxShadow:  isCall ? "0 2px 8px rgba(30,102,64,0.25)" : "none",
  };
}
