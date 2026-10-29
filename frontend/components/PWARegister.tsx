"use client";

import { useEffect } from "react";

/**
 * Registers the HelpNexus service worker for offline support and PWA caching.
 * Runs silently — no UI, no console noise in production.
 */
export default function PWARegister() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then((reg) => {
        // Check for updates when the user re-opens the app
        reg.update().catch(() => {/* ignore network errors */});
      })
      .catch(() => {/* ignore registration failures */});
  }, []);

  return null;
}
