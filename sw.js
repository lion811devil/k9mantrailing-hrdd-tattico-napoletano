const CACHE_NAME = 'k9-pwa-v2';

const ASSETS = [
  '/',
  '/index.html',
  '/content/site.json',
  '/manifest.webmanifest',
  '/logo.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
});

self.addEventListener('fetch', event => {

  const url = new URL(event.request.url);

  // Escludi CMS e servizi Netlify dalla cache

  if (
    url.pathname.startsWith('/admin/') ||
    url.pathname.startsWith('/.netlify/')
  ) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {

        if (
          event.request.method === 'GET' &&
          response.status === 200
        ) {
          const copy = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => cache.put(event.request, copy));
        }

        return response;
      })
      .catch(() =>
        caches.match(event.request)
          .then(cached =>
            cached || caches.match('/index.html')
          )
      )
  );
});
