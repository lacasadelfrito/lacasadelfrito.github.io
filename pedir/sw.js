// Trabajador de la app instalable. Las páginas NO se guardan en el teléfono: cada cambio publicado se ve de inmediato.
// Solo el logo y los íconos (carpeta iconos/, nombres con versión: -v3) se guardan, para que abran al instante.
// Si cambia el logo, se cambia el nombre de los archivos (-v4) y esta caché (CACHE), y la vieja se borra sola.
const CACHE = 'lcdf-iconos-v3';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(ks => Promise.all(ks.filter(k => k.indexOf('lcdf-') === 0 && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== 'GET' || u.origin !== location.origin || u.pathname.indexOf('/iconos/') < 0) return;   // lo demás, sin caché
  e.respondWith(caches.open(CACHE).then(c => c.match(r).then(g => g || fetch(r).then(resp => {
    if (resp.ok) c.put(r, resp.clone());
    return resp;
  }))));
});