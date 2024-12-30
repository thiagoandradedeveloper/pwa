const CACHE_NAME = "meu-pwa-cache-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/icon.png",
];

// Instalação do Service Worker e cache dos arquivos
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Cache criado e arquivos adicionados.");
      return cache.addAll(ASSETS);
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
      // Retorna o recurso do cache ou busca na rede
      return response || fetch(event.request);
    })
  );
});

  let deferredPrompt;

  window.addEventListener("beforeinstallprompt", (e) => {

      // Prevenir que o prompt padrão seja exibido
      e.preventDefault();
      deferredPrompt = e;

      // Exibir um botão ou mensagem para o usuário instalar o app
      const installButton = document.getElementById("install-button");
      if (installButton) {
          
          installButton.style.display = "block";
          installButton.addEventListener("click", () => {

              // Mostrar o prompt de instalação
              deferredPrompt.prompt();

              // Lidar com a resposta do usuário
              deferredPrompt.userChoice.then((choiceResult) => {

                  if (choiceResult.outcome === "accepted") {
                      console.log("Usuário aceitou instalar o PWA");
                  } else {
                      console.log("Usuário recusou instalar o PWA");
                  }
                  deferredPrompt = null; // Limpar o prompt
              
              });
          });
      }
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