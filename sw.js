const CACHE_NAME = "salesprofit-pwa-v2";
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json"
];

// Install Service Worker
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch dari Cache atau Jaringan
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Gunakan cache jika ada
        }
        return fetch(event.request); // Ambil dari internet jika tidak ada di cache
      })
  );
});
