document.addEventListener('DOMContentLoaded', () => {
    // Menú Hamburguesa
    const hamburgerButton = document.getElementById('hamburger-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    if (hamburgerButton && mobileMenu) {
        hamburgerButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Carrusel Hero
    const heroCarousel = document.getElementById('hero-carousel');
    if (heroCarousel) {
        const slides = heroCarousel.querySelectorAll('.hero-slide');
        let currentSlide = 0;
        const slideInterval = 4000; // 4 segundos

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active', 'prev', 'next');
                if (i === index) {
                    slide.classList.add('active');
                } else if (i === (index - 1 + slides.length) % slides.length) {
                    // Esta es la diapositiva anterior que se está "empujando"
                    slide.classList.add('prev');
                } else {
                    // Prepara la siguiente para entrar
                    if ((index + 1) % slides.length === i) {
                        slide.classList.add('next');
                    }
                }
            });
        }

        function nextSlide() {
            const prevIndex = currentSlide;
            currentSlide = (currentSlide + 1) % slides.length;

            slides[prevIndex].classList.remove('active');
            slides[prevIndex].classList.add('prev'); // La activa se convierte en prev para el efecto empuje

            slides[currentSlide].classList.remove('next', 'prev'); // Limpiar por si acaso
            slides[currentSlide].classList.add('active');

            // Pre-cargar la siguiente para que esté lista para la transición 'next'
            const nextIndexForPreload = (currentSlide + 1) % slides.length;
            slides[nextIndexForPreload].classList.remove('active', 'prev');
            slides[nextIndexForPreload].classList.add('next');

        }

        if (slides.length > 0) {
            slides[currentSlide].classList.add('active');
            if (slides.length > 1) {
                slides[(currentSlide + 1) % slides.length].classList.add('next'); // Prepara la siguiente
                setInterval(nextSlide, slideInterval);
            }
        }
    }

    // Animación de texto en Hero con Intersection Observer
    const heroTexts = document.querySelectorAll('.hero-text-animate');
    if (heroTexts.length > 0) {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Opcional: dejar de observar una vez animado para no repetir
                    // heroObserver.unobserve(entry.target); 
                } else {
                    entry.target.classList.remove('visible'); // Para que se repita cada vez
                }
            });
        }, { threshold: 0.5 }); // Se activa cuando el 50% del elemento es visible

        heroTexts.forEach(text => heroObserver.observe(text));
    }


    // Animación de texto "Bienvenida" letra por letra
    const welcomeLinesContainer = document.getElementById('welcome-text-container');
    if (welcomeLinesContainer) {
        const lines = welcomeLinesContainer.querySelectorAll('.welcome-line');
        let animationHasRun = false; // Para controlar que la animación se ejecute solo una vez si es necesario

        const animateWelcomeLines = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animationHasRun) {
                    lines.forEach((line, index) => {
                        // Usamos el data-delay para el tiempo de la animación,
                        // o un simple setTimeout incremental.
                        // El data-delay del HTML es más para el orden,
                        // el delay real lo manejaremos aquí.
                        setTimeout(() => {
                            line.classList.add('visible');
                        }, index * 700); // 700ms de retraso entre cada línea, ajústalo
                    });
                    animationHasRun = true; // Marcar que la animación ya se ejecutó
                    observer.unobserve(entry.target); // Dejar de observar una vez animado
                }
                // Si quieres que se repita cada vez que entra en pantalla:
                // else if (!entry.isIntersecting && animationHasRun) {
                //     lines.forEach(line => line.classList.remove('visible'));
                //     animationHasRun = false; // Permitir que se ejecute de nuevo
                //     observer.observe(welcomeLinesContainer); // Volver a observar si se quitó
                // }
            });
        };

        const welcomeObserver = new IntersectionObserver(animateWelcomeLines, {
            threshold: 0.3, // Se activa cuando el 30% del contenedor es visible
            // rootMargin: "-100px 0px -100px 0px" // Ajustar si es necesario para que se active antes/después
        });

        welcomeObserver.observe(welcomeLinesContainer);
    }

    // Carrusel de Tarjetas de Personajes (usando Swiper.js - RECOMENDADO)
    // Si decides no usar Swiper, necesitarás una implementación manual más compleja
    // o un scroll horizontal simple.
    // Para Swiper:
    // 1. Añade el CDN de Swiper.js en tu HTML:
    //    <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />
    //    <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
    // 2. Descomenta y usa el siguiente código:

    if (typeof Swiper !== 'undefined') {
        const characterSwiper = new Swiper('.character-swiper-container', {
            loop: true, // Lo pongo en true para que el carrusel sea infinito con 3 tarjetas
            slidesPerView: 1, // Por defecto para móviles pequeños
            spaceBetween: 20, // Espacio reducido entre tarjetas para móviles
            grabCursor: true,
            // centeredSlides: true, // Quitado para que la primera tarjeta esté a la izquierda por defecto

            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.character-swiper-button-next', // Usando las clases personalizadas
                prevEl: '.character-swiper-button-prev', // Usando las clases personalizadas
            },
            breakpoints: {
                // Cuando el ancho de la ventana es >= 640px (sm)
                640: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                // Cuando el ancho de la ventana es >= 1024px (lg)
                1024: {
                    slidesPerView: 3, // Mostrar 3 tarjetas
                    spaceBetween: 40, // Espacio entre tarjetas (puedes ajustarlo más, ej: 30px o 50px)
                },
                // Podrías añadir un breakpoint intermedio si quieres
                // 768: { // md
                //     slidesPerView: 2,
                //     spaceBetween: 30,
                // },
            }
        });
    } else {
        console.warn('Swiper.js no está cargado. El carrusel de personajes no funcionará como carrusel avanzado.');
    }

    // Botón "Volver Arriba"
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) { // Muestra el botón después de 300px de scroll
                backToTopButton.classList.remove('hidden');
            } else {
                backToTopButton.classList.add('hidden');
            }
        });
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});