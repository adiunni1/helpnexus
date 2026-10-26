"use client";

export default function ProgressBar({ value }: { value: number }) {
  return (
    <div style={{ height: 2, background: "var(--border)", borderRadius: 2, marginBottom: 28, overflow: "hidden" }}>
      <div style={{
        height: "100%", background: "var(--accent)", borderRadius: 2,
        width: `${value}%`, transition: "width 0.4s ease",
      }} />
    </div>
  );
}
