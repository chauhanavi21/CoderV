/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4f46e5',
        'primary-light': '#6366f1',
        'primary-dark': '#4338ca',
        secondary: '#06b6d4',
        accent: '#f59e0b',
        success: '#10b981',
        danger: '#ef4444',
        muted: '#6b7280',
        surface: '#ffffff',
        'bg-start': '#eef2ff',
        'bg-mid': '#ecfeff',
        'bg-end': '#fff7ed',
      },
      borderRadius: {
        'card': '16px',
        'pill': '14px',
      },
      boxShadow: {
        'card': '0 12px 30px rgba(79, 70, 229, 0.12)',
        'hover': '0 12px 30px rgba(79, 70, 229, 0.15)',
        'btn': '0 10px 18px rgba(79, 70, 229, 0.25)',
      },
      fontFamily: {
        sans: ['"Inter"', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

