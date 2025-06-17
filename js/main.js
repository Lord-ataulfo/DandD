// js/main.js

// Función para el submenú desplegable en móvil (usará IDs originales del header)
function toggleMobileSubmenu() {
    const submenu = document.getElementById('mobile-submenu-aventureros'); // ID original
    if (submenu) {
        submenu.classList.toggle('hidden');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Lógica del Header (Menú Hamburguesa)
    const hamburgerButton = document.getElementById('hamburger-menu'); // ID original
    const mobileMenu = document.getElementById('mobile-menu');       // ID original

    if (hamburgerButton && mobileMenu) {
        hamburgerButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const submenuAventureros = document.getElementById('mobile-submenu-aventureros');
            if (submenuAventureros && mobileMenu.classList.contains('hidden') && !submenuAventureros.classList.contains('hidden')) {
                submenuAventureros.classList.add('hidden');
            }
        });
    }

    // Carrusel Hero
    const heroCarousel = document.getElementById('hero-carousel');
    if (heroCarousel) {
        const slides = heroCarousel.querySelectorAll('.hero-slide');
        if (slides.length > 0) {
            let currentSlide = 0;
            const slideInterval = 4000;
            function nextSlide() {
                const prevIndex = currentSlide;
                if (slides[prevIndex]) { slides[prevIndex].classList.remove('active'); slides[prevIndex].classList.add('prev'); }
                currentSlide = (currentSlide + 1) % slides.length;
                if (slides[currentSlide]) { slides[currentSlide].classList.remove('next', 'prev'); slides[currentSlide].classList.add('active'); }
                const nextIndexForPreload = (currentSlide + 1) % slides.length;
                if (slides[nextIndexForPreload]) { slides[nextIndexForPreload].classList.remove('active', 'prev'); slides[nextIndexForPreload].classList.add('next'); }
            }
            if (slides[currentSlide]) { slides[currentSlide].classList.add('active'); }
            if (slides.length > 1) {
                const nextInitialIndex = (currentSlide + 1) % slides.length;
                if (slides[nextInitialIndex]) { slides[nextInitialIndex].classList.add('next'); }
                setInterval(nextSlide, slideInterval);
            }
        }
    }

    // Animación de texto en Hero con Intersection Observer
    const heroTexts = document.querySelectorAll('.hero-text-animate');
    if (heroTexts.length > 0) {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) { entry.target.classList.add('visible'); }
                else { entry.target.classList.remove('visible'); }
            });
        }, { threshold: 0.5 });
        heroTexts.forEach(text => heroObserver.observe(text));
    }

    // Animación de texto "Bienvenida" línea por línea
    const welcomeLinesContainer = document.getElementById('welcome-text-container');
    if (welcomeLinesContainer) {
        const lines = welcomeLinesContainer.querySelectorAll('.welcome-line');
        if (lines.length > 0) {
            let animationHasRunWelcome = false;
            const animateWelcomeLines = (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !animationHasRunWelcome) {
                        lines.forEach((line, index) => {
                            setTimeout(() => { line.classList.add('visible'); }, index * 700);
                        });
                        animationHasRunWelcome = true; observer.unobserve(entry.target);
                    }
                });
            };
            const welcomeObserver = new IntersectionObserver(animateWelcomeLines, { threshold: 0.3 });
            welcomeObserver.observe(welcomeLinesContainer);
        }
    }

    // Carrusel de Tarjetas de Personajes (Swiper.js)
    if (typeof Swiper !== 'undefined') {
        const characterSwiperContainer = document.querySelector('.character-swiper-container');
        if (characterSwiperContainer) {
            new Swiper(characterSwiperContainer, {
                loop: true, slidesPerView: 1, spaceBetween: 20, grabCursor: true,
                pagination: { el: '.swiper-pagination', clickable: true, },
                navigation: { nextEl: '.character-swiper-button-next', prevEl: '.character-swiper-button-prev', },
                breakpoints: { 640: { slidesPerView: 2, spaceBetween: 30 }, 1024: { slidesPerView: 3, spaceBetween: 40 }, }
            });
        }
    }

    // Botón "Volver Arriba"
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) { backToTopButton.classList.remove('hidden'); }
            else { backToTopButton.classList.add('hidden'); }
        });
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});