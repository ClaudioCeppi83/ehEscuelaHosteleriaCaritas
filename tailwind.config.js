/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdf2f3',
          100: '#fbe6e8',
          200: '#f7cfd3',
          300: '#efa9b0',
          400: '#e37581',
          500: '#c5394a',
          600: '#a62436',
          700: '#8b1e2d', // Granate Institucional Cáritas (WCAG AAA 8.23:1 sobre fondo claro)
          800: '#751c27',
          900: '#631c25',
          950: '#380a11',
          DEFAULT: '#8b1e2d',
        },
        terracotta: {
          light: '#FF8A50',
          DEFAULT: '#E65100',
          dark: '#B23C00',
        },
        charcoal: {
          950: '#07080A',
          900: '#0F1216',
          850: '#15191F',
          800: '#1C222B',
          750: '#232A35',
          700: '#2A3340',
          600: '#3D495B',
          500: '#536278',
          400: '#738399',
          300: '#9FB0C4',
          200: '#CBD5E1',
        },
        linen: {
          50: '#FDFBF7',
          100: '#F7F3EB',
          200: '#EFE8DC',
          300: '#E2D7C5',
          400: '#CFC0A8',
        },
        brass: {
          50: '#FAF8F5',
          100: '#F4EFE6',
          200: '#E7DEC9',
          300: '#D5C4A1',
          400: '#C5A880', // Latón cálido
          500: '#AA8854', // Oro viejo institucional
          600: '#8C6D3B',
          700: '#6E532C',
          800: '#523E23',
          900: '#3D2E1B',
          DEFAULT: '#C5A880',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-down': 'fadeDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeDown: {
          '0%': { opacity: '0', transform: 'translateY(-24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'premium': '0 20px 40px -15px rgba(0, 0, 0, 0.05), 0 0 1px 1px rgba(0, 0, 0, 0.03)',
        'premium-dark': '0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 1px 1px rgba(255, 255, 255, 0.05)',
        'subtle': '0 4px 20px -2px rgba(15, 18, 22, 0.04), 0 2px 6px -1px rgba(15, 18, 22, 0.02)',
        'subtle-dark': '0 4px 20px -2px rgba(0, 0, 0, 0.4), 0 2px 6px -1px rgba(0, 0, 0, 0.2)',
        'glow-orange': '0 0 35px -5px rgba(139, 30, 45, 0.25)',
        'glow-brand': '0 0 35px -5px rgba(139, 30, 45, 0.25)',
      },
    },
  },
  plugins: [],
}
