// Trabajador de la app instalable. No guarda nada en el teléfono: cada cambio publicado se ve de inmediato.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => { /* sin caché */ });