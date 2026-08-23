const CACHE_NAME = "public-health-chatbot-v4";
const APP_SHELL = [
  "/",
  "/index.html",
  "/admin.html",
  "/analytics.html",
  "/deployment.html",
  "/offline.html",
  "/manifest.webmanifest",
  "/src/styles.css",
  "/src/main.js",
  "/src/admin.js",
  "/src/analytics.js",
  "/src/readiness.js",
  "/src/deployment.js",
  "/src/knowledgeBase.js",
  "/src/assets/community-health-map.svg",
  "/src/assets/icon.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(APP_SHELL);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)));
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (url.pathname.startsWith("/api/")) {
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
        return response;
      })
      .catch(async () => {
        return (await caches.match(request)) || caches.match("/offline.html");
      })
  );
});
