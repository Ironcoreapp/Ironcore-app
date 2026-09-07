const CACHE_NAME = 'ironcore-cache-v2'; // Cambiaremos este número si hacemos una actualización masiva a futuro

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Obliga al Service Worker a instalarse de inmediato sin esperar
});

// Activación y limpieza de cachés antiguas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName); // Borra cualquier caché vieja de versiones anteriores
          }
        })
      );
    })
  );
});

// Estrategia: NETWORK FIRST (Internet Primero, Caché como Respaldo)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Si hay internet y el archivo se descarga bien, lo guardamos en la nueva caché
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          // No guardamos en caché las peticiones de base de datos o extensiones raras
          if (event.request.url.startsWith('http') && event.request.method === 'GET') {
            cache.put(event.request, responseClone);
          }
        });
        return response;
      })
      .catch(() => {
        // Si falla el internet, devolvemos lo que tengamos guardado en la caché
        return caches.match(event.request);
      })
  );
});
