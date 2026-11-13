// Service worker: guarda la app para que abra sin conexión.
// Cambia la versión cada vez que publiques cambios para que el iPhone los descargue.
const CACHE = 'reproductor-v5';
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // YouTube, su API y Audius siempre van directo a internet (nunca se guarda la música en caché).
  // Audius tampoco entra en la lista de archivos que se guardan más abajo.
  if (url.hostname === 'www.googleapis.com' || /(^|\.)youtube\.com$|(^|\.)ytimg\.com$|(^|\.)googlevideo\.com$/.test(url.hostname)) return;

  // La página: primero internet (para recibir actualizaciones), si no hay, la copia guardada
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put('./index.html', copy)); return res; })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Archivos propios, fuentes y la librería de etiquetas: copia guardada y se actualiza en segundo plano
  const cacheable = url.origin === self.location.origin ||
    url.hostname === 'cdnjs.cloudflare.com' || url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (!cacheable) return;

  e.respondWith(
    caches.open(CACHE).then(async cache => {
      const hit = await cache.match(req);
      const net = fetch(req).then(res => { if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone()); return res; }).catch(() => hit);
      return hit || net;
    })
  );
});
