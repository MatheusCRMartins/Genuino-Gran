/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#c9a96e',
          light: '#d4b88a',
          dark: '#a8853e',
        },
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fade-in': 'fadeIn 0.8s ease forwards',
      },
    },
  },
  plugins: [],
}
