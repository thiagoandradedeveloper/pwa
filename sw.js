const CACHE_NAME = "meu-pwa-cache-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./icon.png"
];

// Instalação do Service Worker e cache dos arquivos
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Cache criado e arquivos adicionados.");
      return cache.addAll(ASSETS).catch((error) => {
        console.error("Erro ao adicionar arquivos ao cache:", error);
      });
    })
  );
});

// Ativação do Service Worker e limpeza de caches antigos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Cache antigo removido:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Interceptação de requisições e uso do cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch(() => {
          if (event.request.destination === "document") {
            return caches.match("./offline.html"); // Fallback para uma página offline
          }
        })
      );
    })
  );
});



/*let cacheName = 'cache-v1';

self.addEventListener('install', (e) => {

  let cache = caches.open(cacheName).then((c) => {
    c.addAll([
      // nothing
    ]);
  });

  e.waitUntil(cache);
});

self.addEventListener('fetch', function (event) {

  event.respondWith(

    caches.open(cacheName).then(function (cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function (response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })

  );

});*/