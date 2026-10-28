"use client";

import { motion } from "framer-motion";

const STAGGER = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.09 } },
} as const;

const ITEM = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 26 } },
} as const;

export default function LandingScreen({ onStart }: { onStart: () => void }) {
  return (
    <div style={{
      minHeight: "100svh",
      background: "var(--hero)",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* ── Topographic background lines ── */}
      <svg
        aria-hidden
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 400 750"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.18, pointerEvents: "none" }}
      >
        <path d="M-60 90  C 80  55, 210 130, 380  70 S 540 105, 650  55" stroke="#5CB87A" strokeWidth="1.3" fill="none"/>
        <path d="M-60 170 C 60 135, 200 200, 370 155 S 520 185, 640 145" stroke="#5CB87A" strokeWidth="1.3" fill="none"/>
        <path d="M-60 250 C 70 218, 220 272, 390 232 S 530 260, 650 224" stroke="#5CB87A" strokeWidth="1.3" fill="none"/>
        <path d="M-60 330 C 95 298, 240 348, 408 308 S 540 338, 660 302" stroke="#5CB87A" strokeWidth="1.3" fill="none"/>
        <path d="M-60 410 C 75 380, 215 418, 385 384 S 524 412, 650 380" stroke="#5CB87A" strokeWidth="1.3" fill="none"/>
        <path d="M-60 490 C 88 460, 232 498, 402 466 S 535 494, 660 460" stroke="#5CB87A" strokeWidth="1.3" fill="none"/>
        <path d="M-60 570 C 78 540, 225 578, 396 546 S 528 576, 652 542" stroke="#5CB87A" strokeWidth="1.3" fill="none"/>
        <path d="M-60 650 C 94 620, 245 658, 418 624 S 548 654, 665 618" stroke="#5CB87A" strokeWidth="1.3" fill="none"/>
        {/* Faint secondary layer */}
        <path d="M-60 130 C 90 100, 250 148, 420 112 S 560 142, 660  96" stroke="#5CB87A" strokeWidth="0.7" fill="none" opacity="0.6"/>
        <path d="M-60 290 C 72 260, 224 302, 392 270 S 526 298, 652 264" stroke="#5CB87A" strokeWidth="0.7" fill="none" opacity="0.6"/>
        <path d="M-60 450 C 85 420, 235 458, 405 428 S 532 456, 655 422" stroke="#5CB87A" strokeWidth="0.7" fill="none" opacity="0.6"/>
        <path d="M-60 610 C 90 580, 244 616, 414 582 S 542 610, 660 574" stroke="#5CB87A" strokeWidth="0.7" fill="none" opacity="0.6"/>
      </svg>

      {/* ── Content column ── */}
      <div style={{
        position: "relative",
        zIndex: 1,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        paddingTop:    "max(28px, env(safe-area-inset-top, 28px))",
        paddingBottom: "max(40px, env(safe-area-inset-bottom, 40px))",
        paddingLeft:   "max(28px, env(safe-area-inset-left, 28px))",
        paddingRight:  "max(28px, env(safe-area-inset-right, 28px))",
        maxWidth: 480,
        width: "100%",
        margin: "0 auto",
      }}>

        {/* Logo badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          marginBottom: "auto",
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 10,
            background: "rgba(255,255,255,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M8 2C8 2 4 5 4 9a4 4 0 008 0c0-4-4-7-4-7z" fill="white" opacity="0.9"/>
              <path d="M8 6v4M6 8h4" stroke="var(--hero)" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </div>
          <span style={{
            fontSize: "0.75rem", fontWeight: 700,
            letterSpacing: "0.09em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
          }}>
            HelpNexus · Eugene
          </span>
        </div>

        {/* ── Animated main content ── */}
        <motion.div
          variants={STAGGER}
          initial="hidden"
          animate="show"
          style={{ paddingTop: 40, paddingBottom: 8 }}
        >

          {/* Hands illustration */}
          <motion.div variants={ITEM} style={{ marginBottom: 40, lineHeight: 0 }}>
            <svg
              viewBox="0 0 300 155"
              width="270"
              height="140"
              fill="none"
              aria-hidden
              style={{ display: "block" }}
            >
              {/* Left hand — palm left, fingers reach right */}
              <g fill="rgba(240,230,207,0.82)">
                {/* Palm */}
                <rect x="4"  y="38" width="56" height="104" rx="26"/>
                {/* Index */}
                <rect x="44" y="36" width="70"  height="22" rx="11"/>
                {/* Middle (longest) */}
                <rect x="44" y="62" width="82"  height="22" rx="11"/>
                {/* Ring */}
                <rect x="44" y="88" width="74"  height="22" rx="11"/>
                {/* Pinky */}
                <rect x="44" y="114" width="56" height="18" rx="9"/>
                {/* Thumb */}
                <rect x="2"  y="30" width="44" height="20" rx="10"
                      transform="rotate(-38 24 40)"/>
              </g>

              {/* Right hand — mirror */}
              <g fill="rgba(240,230,207,0.82)" transform="translate(300,0) scale(-1,1)">
                <rect x="4"  y="38" width="56" height="104" rx="26"/>
                <rect x="44" y="36" width="70"  height="22" rx="11"/>
                <rect x="44" y="62" width="82"  height="22" rx="11"/>
                <rect x="44" y="88" width="74"  height="22" rx="11"/>
                <rect x="44" y="114" width="56" height="18" rx="9"/>
                <rect x="2"  y="30" width="44" height="20" rx="10"
                      transform="rotate(-38 24 40)"/>
              </g>
            </svg>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={ITEM}
            style={{
              fontFamily: "var(--font-d)",
              fontSize: "clamp(2.2rem, 8.5vw, 3rem)",
              fontWeight: 700,
              lineHeight: 1.08,
              color: "#ffffff",
              letterSpacing: "-0.01em",
              marginBottom: 18,
            }}
          >
            Find the right<br />support,<br />right now.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={ITEM}
            style={{
              fontSize: "1.02rem",
              lineHeight: 1.68,
              color: "rgba(255,255,255,0.62)",
              marginBottom: 40,
              maxWidth: 320,
            }}
          >
            Three quick questions. Real resources in
            Eugene &amp; Lane County, Oregon.
          </motion.p>

          {/* CTA button */}
          <motion.div variants={ITEM}>
            <button
              className="btn-hero"
              onClick={onStart}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "17px 36px",
                borderRadius: 100,
                border: "none",
                background: "#ffffff",
                color: "var(--hero)",
                fontSize: "1rem",
                fontWeight: 700,
                cursor: "pointer",
                letterSpacing: "0.01em",
                boxShadow: "0 4px 28px rgba(0,0,0,0.24)",
              }}
            >
              Get started
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </motion.div>

          {/* Crisis note */}
          <motion.div
            variants={ITEM}
            style={{
              marginTop: 36,
              padding: "15px 18px",
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.13)",
              borderRadius: 14,
              fontSize: "0.84rem",
              lineHeight: 1.62,
              color: "rgba(255,255,255,0.72)",
            }}
          >
            <strong style={{ color: "#FFB347" }}>In immediate danger?</strong>{" "}
            Call <strong style={{ color: "#fff" }}>911</strong>.{" "}
            Mental health crisis: call or text{" "}
            <strong style={{ color: "#fff" }}>988</strong>. Free, confidential, 24/7.
          </motion.div>
        </motion.div>

        {/* Footer */}
        <div style={{
          marginTop: 32,
          paddingTop: 20,
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}>
          <p style={{
            fontSize: "0.71rem",
            color: "rgba(255,255,255,0.35)",
            textAlign: "center",
            lineHeight: 1.6,
          }}>
            Community reference tool. Not a crisis line or emergency service.
          </p>
        </div>
      </div>
    </div>
  );
}
