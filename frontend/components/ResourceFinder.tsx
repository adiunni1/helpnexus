"use client";

import { useState, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { IntakeState, IntakeResponse, WhoValue, WhatValue, UrgValue } from "@/lib/types";
import { submitIntake } from "@/lib/api";
import ProgressBar from "./ProgressBar";
import LandingScreen from "./screens/LandingScreen";
import Step1Screen  from "./screens/Step1Screen";
import Step2Screen  from "./screens/Step2Screen";
import Step3Screen  from "./screens/Step3Screen";
import ResultsScreen from "./screens/ResultsScreen";

export type ScreenId = "landing" | "s1" | "s2" | "s3" | "results";

const SCREEN_ORDER: ScreenId[] = ["landing", "s1", "s2", "s3", "results"];
const PROGRESS: Record<ScreenId, number> = {
  landing: 0, s1: 30, s2: 62, s3: 88, results: 100,
};
const INITIAL_STATE: IntakeState = { who: null, what: null, urg: null };

const SPRING = { type: "spring" as const, stiffness: 340, damping: 30, mass: 0.8 };

export default function ResourceFinder() {
  const [screen,   setScreen]   = useState<ScreenId>("landing");
  const [intake,   setIntake]   = useState<IntakeState>(INITIAL_STATE);
  const [results,  setResults]  = useState<IntakeResponse | null>(null);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState<string | null>(null);
  const dirRef = useRef<1 | -1>(1); // 1 = forward, -1 = back

  const go = useCallback((id: ScreenId) => {
    const currIdx = SCREEN_ORDER.indexOf(screen);
    const nextIdx = SCREEN_ORDER.indexOf(id);
    dirRef.current = nextIdx >= currIdx ? 1 : -1;
    setScreen(id);
    if (id === "landing") {
      setIntake(INITIAL_STATE);
      setResults(null);
      setError(null);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [screen]);

  const setWho  = (v: WhoValue)  => setIntake(s => ({ ...s, who:  v }));
  const setWhat = (v: WhatValue) => setIntake(s => ({ ...s, what: v }));
  const setUrg  = (v: UrgValue)  => setIntake(s => ({ ...s, urg:  v }));

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await submitIntake({
        who:  intake.who  ?? undefined,
        what: intake.what ?? undefined,
        urg:  intake.urg  ?? undefined,
      });
      setResults(data);
      go("results");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const dir = dirRef.current;

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", minHeight: "100svh", display: "flex", flexDirection: "column" }}>

      {/* Top nav */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        paddingBlock: 20, gap: 12,
        position: "sticky", top: 0, zIndex: 10,
        background: "rgba(var(--bg-rgb, 244,248,245), 0.88)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        marginInline: -16,
        paddingInline: 16,
      }}>
        <div style={{
          fontFamily: "var(--font-d)", fontSize: "1.05rem",
          fontWeight: 600, color: "var(--accent)",
          letterSpacing: "-0.01em",
        }}>
          HelpNexus<em style={{ fontWeight: 400, fontStyle: "italic", color: "var(--fg-muted)", marginLeft: 4 }}>Eugene</em>
        </div>
        {screen !== "landing" && (
          <button
            className="btn-ghost"
            onClick={() => go("landing")}
            style={{
              fontSize: "0.8rem", fontWeight: 600, color: "var(--fg-muted)",
              background: "var(--bg-alt)", border: "1px solid var(--border)",
              padding: "6px 14px", borderRadius: 100, cursor: "pointer",
            }}
          >
            Start over
          </button>
        )}
      </div>

      <ProgressBar value={PROGRESS[screen]} />

      {/* Screen container — AnimatePresence handles enter/exit */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={screen}
          initial={{ opacity: 0, x: dir * 28 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dir * -28 }}
          transition={SPRING}
          style={{ flex: 1, display: "flex", flexDirection: "column" }}
        >
          {screen === "landing" && <LandingScreen onStart={() => go("s1")} />}
          {screen === "s1"      && <Step1Screen  intake={intake} onSet={setWho}  onBack={() => go("landing")} onNext={() => go("s2")} />}
          {screen === "s2"      && <Step2Screen  intake={intake} onSet={setWhat} onBack={() => go("s1")}      onNext={() => go("s3")} />}
          {screen === "s3"      && <Step3Screen  intake={intake} onSet={setUrg}  onBack={() => go("s2")}      onNext={handleSubmit} loading={loading} error={error} />}
          {screen === "results" && results && <ResultsScreen results={results} intake={intake} onBack={() => go("s1")} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
