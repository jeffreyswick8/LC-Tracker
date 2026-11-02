/* SBN207 Liquid Cooling Tracker — service worker (NETWORK-FIRST) */
const CACHE = 'sbn207-lc-v65';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './same_same.jpg'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// NETWORK-FIRST for app shell: always try the network so fresh deploys land
// immediately; fall back to cache only when offline. Updates the cache on every
// successful fetch so the offline copy stays current for the data hall.
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  // Only handle same-origin requests; let Firebase/CDN traffic pass straight through.
  try { if (new URL(e.request.url).origin !== self.location.origin) return; } catch (err) { return; }
  e.respondWith(
    fetch(e.request).then((resp) => {
      // Fresh copy from network — update the cache, then serve it.
      try {
        const copy = resp.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
      } catch (err) {}
      return resp;
    }).catch(() => caches.match(e.request))   // offline: serve cached copy
  );
});
