const CACHE_NAME = 'k9-pwa-v20-cms-split';

const ASSETS = [
  '/',
  '/index.html',
  '/content/site.json',
  '/content/home.json',
  '/content/profile-contacts.json',
  '/content/disciplines.json',
  '/content/dogs.json',
  '/content/courses.json',
  '/content/events.json',
  '/content/media.json',
  '/content/network.json',
  '/content/faq.json',
  '/content/builder.json',
  '/manifest.webmanifest',
  '/logo.png'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
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
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  if (
    url.pathname.startsWith('/admin') ||
    url.pathname.startsWith('/.netlify') ||
    url.pathname.startsWith('/assets/uploads')
  ) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (event.request.method === 'GET' && response.status === 200) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(() =>
        caches.match(event.request).then(cached => cached || caches.match('/index.html'))
      )
  );
});
