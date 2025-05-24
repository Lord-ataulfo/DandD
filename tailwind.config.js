/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/**/*.js"], // Escanea archivos HTML y JS en busca de clases de Tailwind
  theme: {
    extend: {
      fontFamily: {
        'ephesis': ['Ephesis', 'cursive'],
        'noto-sans-gothic': ['"Noto Sans Gothic"', 'sans-serif'], // Asegúrate de que el nombre coincida con Google Fonts
      },
      colors: {
        'custom-hero-text': '#9E9B9B',
        'custom-card-title': '#791B4D',
        'custom-bienvenida-bg': '#FFFFFF', // Asumiendo fondo blanco para Bienvenida si no se especifica
        'custom-aventureros-bg': '#DBD5D5',
        'custom-romulo-title': '#B22323',
        'custom-rhananhta-title': '#205F24',
      },
      height: {
        '95vh': '95vh',
      },
      minHeight: {
        '90px': '90px',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        letterAppear: {
            '0%': { width: '0', opacity: '0'},
            '100%': { width: '100%', opacity: '1'},
        },
        // Para el carrusel de imágenes (si se hace con keyframes, aunque JS es más flexible)
        slideLeft: {
            '0%': { transform: 'translateX(100%)' },
            '100%': { transform: 'translateX(0%)' },
        },
        slideOutLeft: {
            '0%': { transform: 'translateX(0%)' },
            '100%': { transform: 'translateX(-100%)' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 1.5s ease-out forwards', // 'forwards' mantiene el estado final
        'letter-by-letter': 'letterAppear 0.1s steps(1, end) forwards', // Esto es por letra, JS lo controlará
        'slide-in': 'slideLeft 0.5s ease-out forwards',
        'slide-out': 'slideOutLeft 0.5s ease-in forwards',
      },
      transitionDelay: {
        '500': '500ms',
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-stroke-black-1': {
          '-webkit-text-stroke': '1px black',
          'text-stroke': '1px black',
        },
        '.text-stroke-white-1': {
          '-webkit-text-stroke': '1px white',
          'text-stroke': '1px white',
        },
        '.text-ellipsis-custom': { // Para truncar texto en múltiples líneas
          'display': '-webkit-box',
          '-webkit-line-clamp': '3', /* Número de líneas a mostrar */
          '-webkit-box-orient': 'vertical',
          'overflow': 'hidden',
          'text-overflow': 'ellipsis',
          'height': '4.5em', /* Ajustar según font-size y line-height (20px * 1.5 line-height * 3 lines = 90px o 4.5em) */
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
}