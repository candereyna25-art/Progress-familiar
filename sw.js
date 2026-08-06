const CACHE = 'wt-211-repair';
const CORE = [
  './',
  './index.html',
  './styles.css',
  './main.js',
  './config.js',
  './health.js',
  './charts.js',
  './coach.js',
  './manifest.webmanifest'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then(cache =>
      Promise.allSettled(CORE.map(url => cache.add(url)))
    )
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put('./index.html', copy));
          return response;
        })
        .catch(async () =>
          (await caches.match(request)) ||
          (await caches.match('./index.html')) ||
          new Response('Sin conexión. Vuelve a intentar.', {
            status: 503,
            headers: { 'Content-Type': 'text/plain; charset=utf-8' }
          })
        )
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request)
        .then(response => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE).then(cache => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => new Response('', { status: 503 }));
    })
  );
});
