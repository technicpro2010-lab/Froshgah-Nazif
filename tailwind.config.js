/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        afghan: {
          emerald: '#0f5132',
          emeraldDark: '#083320',
          emeraldLight: '#198754',
          gold: '#c59b27',
          goldLight: '#e6c875',
          goldDark: '#99730e',
          ruby: '#80182a',
          rubyDark: '#560e1b',
          crimson: '#a31d36',
          sand: '#fbf9f5',
          charcoal: '#1a1f1e'
        }
      },
      fontFamily: {
        sans: ['Vazirmatn', 'Segoe UI', 'Tahoma', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(12, 59, 40, 0.15)',
        'gold-glow': '0 0 25px rgba(197, 155, 39, 0.35)'
      }
    },
  },
  plugins: [],
}

