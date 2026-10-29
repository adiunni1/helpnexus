/**
 * HelpNexus Service Worker
 *
 * Strategy:
 *   - App shell (HTML, JS, CSS, fonts, icons) → Cache-first with background update
 *   - API calls (/api/*) → Network-only (data must be fresh)
 *   - Navigation failures when offline → Serve /offline page from cache
 */

const CACHE_NAME = "helpnexus-v1";
const OFFLINE_URL = "/offline";

// Assets to pre-cache on install (app shell)
const PRECACHE_URLS = [
  "/",
  "/offline",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/apple-touch-icon.png",
];

// ── Install: pre-cache the offline page + core assets ──────────────────────
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(PRECACHE_URLS)
    ).then(() => self.skipWaiting())
  );
});

// ── Activate: clean up old caches ──────────────────────────────────────────
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: decide strategy per request type ────────────────────────────────
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and cross-origin requests
  if (request.method !== "GET" || url.origin !== location.origin) return;

  // API calls — always go to the network; never serve stale data
  if (url.pathname.startsWith("/api/")) return;

  // Navigation requests — network first, offline page fallback
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() =>
        caches.match(OFFLINE_URL)
      )
    );
    return;
  }

  // Everything else (JS, CSS, images, fonts) — cache first, background refresh
  event.respondWith(
    caches.match(request).then((cached) => {
      const networkFetch = fetch(request).then((response) => {
        // Only cache valid same-origin responses
        if (response && response.status === 200 && response.type === "basic") {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      }).catch(() => cached); // network failed, return whatever is cached

      return cached || networkFetch;
    })
  );
});
