"use client";

const s = {
  root:       { flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingBlock: "32px 24px" } as React.CSSProperties,
  eyebrow:    { fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "var(--accent)", marginBottom: 14 },
  h1:         { fontFamily: "var(--font-d)", fontSize: "clamp(1.85rem, 5.5vw, 2.5rem)", fontWeight: 600, lineHeight: 1.18, color: "var(--fg)", marginBottom: 18 },
  desc:       { color: "var(--fg-muted)", fontSize: "0.95rem", lineHeight: 1.65, maxWidth: 420, marginBottom: 32 },
  btn:        { display: "inline-flex", alignItems: "center", gap: 7, padding: "12px 24px", borderRadius: 8, border: "none", background: "var(--accent)", color: "#fff", fontSize: "0.95rem", fontWeight: 600, cursor: "pointer", width: "fit-content" },
  note:       { background: "var(--amber-lite)", borderLeft: "3px solid var(--amber)", borderRadius: "0 var(--r) var(--r) 0", padding: "14px 16px", fontSize: "0.83rem", lineHeight: 1.5, color: "var(--fg)", marginTop: 20 },
  noteStrong: { color: "var(--amber)" },
  foot:       { borderTop: "1px solid var(--border)", paddingBlock: "18px 22px", marginTop: 12 },
  footP:      { fontSize: "0.75rem", color: "var(--fg-muted)", lineHeight: 1.65, textAlign: "center" as const },
};

export default function LandingScreen({ onStart }: { onStart: () => void }) {
  return (
    <>
      <div style={s.root}>
        <div style={s.eyebrow}>Eugene &amp; Lane County, Oregon</div>
        <h1 style={s.h1}>Find the right support,<br />right now.</h1>
        <p style={s.desc}>
          Answer three quick questions and we&rsquo;ll match you with crisis services,
          mental health resources, and community support available in your area.
        </p>
        <button style={s.btn} onClick={onStart}>Find resources →</button>
        <div style={s.note}>
          <strong style={s.noteStrong}>In immediate danger?</strong> Call 911. For a mental health crisis,
          call or text <strong>988</strong> (Suicide &amp; Crisis Lifeline) — free, confidential, 24/7.
        </div>
      </div>
      <div style={s.foot}>
        <p style={s.footP}>
          This tool is a community reference, not a crisis line or emergency service.<br />
          Always confirm details directly with each organization.
        </p>
      </div>
    </>
  );
}
