document.addEventListener('DOMContentLoaded', () => {
    // --- Menú Hamburguesa ---
    const burgerButton = document.getElementById('burger-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuContent = document.getElementById('mobile-menu-content');
    const aventurerosMobileToggle = document.getElementById('aventureros-mobile-toggle');
    const aventurerosMobileSubmenu = document.getElementById('aventureros-mobile-submenu');

    if (burgerButton && mobileMenu) {
        burgerButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            // Evitar scroll del body cuando el menú está abierto
            if (!mobileMenu.classList.contains('hidden')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
                // Asegurarse que el submenú también se oculte al cerrar el menú principal
                if (aventurerosMobileSubmenu && !aventurerosMobileSubmenu.classList.contains('hidden')) {
                    aventurerosMobileSubmenu.classList.add('hidden');
                }
            }
        });
    }

    if (aventurerosMobileToggle && aventurerosMobileSubmenu) {
        aventurerosMobileToggle.addEventListener('click', (e) => {
            e.preventDefault(); // Prevenir navegación si es un enlace
            aventurerosMobileSubmenu.classList.toggle('hidden');
        });
    }

    // Cerrar menú si se hace clic fuera de él (en el overlay)
    if (mobileMenu && mobileMenuContent) {
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) { // Si el clic es en el overlay y no en el contenido
                mobileMenu.classList.add('hidden');
                document.body.style.overflow = 'auto';
                if (aventurerosMobileSubmenu && !aventurerosMobileSubmenu.classList.contains('hidden')) {
                    aventurerosMobileSubmenu.classList.add('hidden');
                }
            }
        });
    }


    // --- Carrusel Hero ---
    const heroCarousel = document.getElementById('hero-carousel');
    if (heroCarousel) {
        const items = heroCarousel.querySelectorAll('.carousel-item');
        let currentIndex = 0;
        const totalItems = items.length;
        const intervalTime = 4000; // 4 segundos

        function showItem(index) {
            items.forEach((item, i) => {
                item.classList.add('absolute', 'opacity-0'); // Asegurar que todos estén absolutos y ocultos
                item.style.transform = 'translateX(100%)'; // Posición inicial para entrar
                if (i === index) { // Item actual
                    item.classList.remove('opacity-0');
                    item.style.transform = 'translateX(0%)';
                } else if (i === (index - 1 + totalItems) % totalItems) { // Item anterior
                    item.classList.remove('opacity-0'); // Mantener visible para la transición de salida
                    item.style.transform = 'translateX(-100%)';
                }
            });
        }

        function nextItem() {
            const prevIndex = currentIndex;
            currentIndex = (currentIndex + 1) % totalItems;

            // Mover el actual a la izquierda (para el efecto de empujar)
            items[prevIndex].style.transform = 'translateX(-100%)';
            items[prevIndex].classList.add('opacity-0'); // Puede ser opcional dependiendo del efecto deseado

            // Traer el nuevo desde la derecha
            items[currentIndex].style.transform = 'translateX(100%)'; // Resetear posición antes de la animación
            requestAnimationFrame(() => { // Asegurar que el reset se aplique antes de la animación
                items[currentIndex].classList.remove('opacity-0');
                items[currentIndex].style.transform = 'translateX(0%)';
            });
        }

        if (totalItems > 0) {
            // Inicializar: el primero visible, los demás a la derecha
            items.forEach((item, i) => {
                item.classList.add('absolute', 'inset-0', 'w-full', 'h-full', 'object-cover');
                if (i === 0) {
                    item.classList.remove('opacity-0');
                    item.style.transform = 'translateX(0%)';
                } else {
                    item.classList.add('opacity-0');
                    item.style.transform = 'translateX(100%)';
                }
            });
            setInterval(nextItem, intervalTime);
        }
    }

    // --- Animación Texto Hero con Intersection Observer ---
    const heroText1 = document.getElementById('hero-text-1');
    const heroText2 = document.getElementById('hero-text-2');

    const heroObserverCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('opacity-0');
                if (entry.target.id === 'hero-text-1') {
                    entry.target.classList.add('animate-fadeInText');
                } else if (entry.target.id === 'hero-text-2') {
                    entry.target.classList.add('animate-fadeInText-delayed');
                }
            } else {
                // Reset para que la animación ocurra cada vez
                entry.target.classList.add('opacity-0');
                entry.target.classList.remove('animate-fadeInText', 'animate-fadeInText-delayed');
            }
        });
    };
    const heroObserverOptions = { threshold: 0.5 }; // Animar cuando el 50% es visible
    const heroObserver = new IntersectionObserver(heroObserverCallback, heroObserverOptions);

    if (heroText1) heroObserver.observe(heroText1);
    if (heroText2) heroObserver.observe(heroText2);

    // --- Animación Texto Bienvenida (Letra por Letra) ---
    const welcomeTextElement = document.getElementById('welcome-text');
    if (welcomeTextElement) {
        const originalText = "Bienvenidos a esta aventura, Creada por mí Master Kevin, Brindemos por nuestros aventureros, esperando lleguen al final";
        welcomeTextElement.innerHTML = ''; // Limpiar
        originalText.split('').forEach(char => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char; // Usar non-breaking space para espacios
            welcomeTextElement.appendChild(span);
        });

        const spans = welcomeTextElement.querySelectorAll('span');
        let charIndex = 0;
        let animationInterval;

        const typeLetter = () => {
            if (charIndex < spans.length) {
                spans[charIndex].classList.add('visible');
                charIndex++;
            } else {
                clearInterval(animationInterval);
            }
        };

        const welcomeObserverCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (charIndex < spans.length) { // Solo iniciar si no ha terminado
                        // Resetear animación si se quiere que se repita al volver a ver
                        charIndex = 0;
                        spans.forEach(s => s.classList.remove('visible'));
                        animationInterval = setInterval(typeLetter, 50); // Ajusta la velocidad (milisegundos)
                    }
                    // observer.unobserve(entry.target); // Descomentar si solo se anima una vez
                } else {
                    // Opcional: resetear si sale de la vista para reanimar al volver
                    clearInterval(animationInterval);
                    // charIndex = 0; 
                    // spans.forEach(s => s.classList.remove('visible'));
                }
            });
        };
        const welcomeObserver = new IntersectionObserver(welcomeObserverCallback, { threshold: 0.5 });
        welcomeObserver.observe(welcomeTextElement);
    }


    // --- Botón "Volver Arriba" ---
    const toTopBtn = document.getElementById('toTopBtn');
    if (toTopBtn) {
        window.onscroll = function () {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                toTopBtn.classList.remove('hidden');
            } else {
                toTopBtn.classList.add('hidden');
            }
        };
        toTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});