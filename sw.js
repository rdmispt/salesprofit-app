const CACHE_NAME = "salesprofit-pwa-v30";

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
  // Memaksa SW baru untuk segera aktif
  self.skipWaiting();
});

// Aktivasi & Hapus Cache Lama
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Menghapus cache lama:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Memastikan semua tab yang terbuka menggunakan SW baru
  self.clients.claim();
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
