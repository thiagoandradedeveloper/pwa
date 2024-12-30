if ('serviceWorker' in navigator) {
    
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('sw.js');
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

}