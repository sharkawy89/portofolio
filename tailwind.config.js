/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        'bg-primary': '#020617',
        'bg-secondary': '#030712',
        'surface': '#0f172a',
        'surface-secondary': '#111827',
        'surface-elevated': '#172033',
        'text-primary': '#f8fafc',
        'text-secondary': '#cbd5e1',
        'text-tertiary': '#94a3b8',
        'text-muted': '#64748b',
        'text-footer': '#64748b',
        'border-primary': '#1e293b',
        'border-secondary': '#334155',
        'accent': '#38bdf8',
        'accent-light': '#7dd3fc',
        'accent-dark': '#0ea5e9',
      },
      boxShadow: {
        'accent': '0 4px 15px rgba(56, 189, 248, 0.3)',
        'accent-lg': '0 10px 40px rgba(56, 189, 248, 0.3)',
      },
      animation: {
        'stars': 'moveStars 100s linear infinite',
      },
      keyframes: {
        moveStars: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 1000px' },
        },
      },
    },
  },
  plugins: [],
}
