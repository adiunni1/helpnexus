"use client";

export default function OfflinePage() {
  return (
    <div style={{
      minHeight: "100svh",
      background: "var(--hero, #1A3D28)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "max(28px, env(safe-area-inset-top, 28px)) max(28px, env(safe-area-inset-right, 28px))",
      textAlign: "center",
    }}>
      {/* Icon */}
      <div style={{
        width: 72, height: 72, borderRadius: 20,
        background: "rgba(255,255,255,0.12)",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 28,
      }}>
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
          <path d="M18 4C18 4 10 9 10 18a8 8 0 0016 0c0-9-8-14-8-14z"
                fill="white" opacity="0.9"/>
          <path d="M18 13v8M14 17h8"
                stroke="#1A3D28" strokeWidth="2.2" strokeLinecap="round"/>
        </svg>
      </div>

      <h1 style={{
        fontFamily: "'Poppins', system-ui, sans-serif",
        fontSize: "clamp(1.6rem, 6vw, 2.2rem)",
        fontWeight: 700,
        color: "#ffffff",
        letterSpacing: "-0.01em",
        lineHeight: 1.15,
        marginBottom: 16,
      }}>
        You&apos;re offline
      </h1>

      <p style={{
        fontSize: "1rem",
        lineHeight: 1.65,
        color: "rgba(255,255,255,0.65)",
        maxWidth: 320,
        marginBottom: 36,
      }}>
        HelpNexus needs an internet connection to find resources for you.
        Please reconnect and try again.
      </p>

      {/* Crisis note — always show this even offline */}
      <div style={{
        padding: "16px 20px",
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.14)",
        borderRadius: 14,
        fontSize: "0.88rem",
        lineHeight: 1.65,
        color: "rgba(255,255,255,0.75)",
        maxWidth: 340,
      }}>
        <strong style={{ color: "#FFB347" }}>In immediate danger?</strong>{" "}
        Call <strong style={{ color: "#fff" }}>911</strong>.{" "}
        Mental health crisis: call or text{" "}
        <strong style={{ color: "#fff" }}>988</strong>. Free, confidential, 24/7.
      </div>

      <button
        onClick={() => window.location.href = "/"}
        style={{
          marginTop: 28,
          padding: "14px 32px",
          borderRadius: 100,
          border: "none",
          background: "#ffffff",
          color: "#1A3D28",
          fontSize: "0.95rem",
          fontWeight: 700,
          cursor: "pointer",
          letterSpacing: "0.01em",
          boxShadow: "0 4px 24px rgba(0,0,0,0.22)",
        }}
      >
        Try again
      </button>
    </div>
  );
}
