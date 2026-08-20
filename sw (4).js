const CACHE_NAME = "statline-shell-v6";
const SHELL_FILES = [
  "./",
  "./index.html",
  "./app.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_FILES))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Cache-first pour le shell de l'app. Les appels API (v3.football.api-sports.io)
// passent toujours par le réseau : jamais de données de match mises en cache ici,
// pour ne pas afficher de cotes périmées.
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (url.origin.includes("api-sports.io") || url.origin.includes("api.football-data")) {
    return; // laisse passer directement au réseau
  }
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
