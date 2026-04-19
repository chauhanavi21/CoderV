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
        // Linear / Vercel-inspired neutral palette.
        // We deliberately repaint the "indigo" / "primary" tokens used across
        // the codebase so existing class names keep working but render as a
        // restrained monochrome system.
        primary:        '#e5e7eb', // near-white foreground accent (light side)
        'primary-light':'#f3f4f6',
        'primary-dark': '#a1a1aa',
        secondary:      '#a1a1aa',
        accent:         '#f4f4f5',
        success:        '#22c55e',
        danger:         '#ef4444',
        muted:          '#71717a',
        surface:        '#0a0a0a',
        'bg-start':     '#0a0a0a',
        'bg-mid':       '#0a0a0a',
        'bg-end':       '#0a0a0a',
      },
      borderRadius: {
        // Sharper edges across the app. Anything that asks for "2xl" gets 8px.
        'sm':   '4px',
        DEFAULT:'6px',
        'md':   '6px',
        'lg':   '6px',
        'xl':   '8px',
        '2xl':  '8px',
        '3xl':  '10px',
        'card': '8px',
        'pill': '9999px',
      },
      boxShadow: {
        // Replace puffy colored shadows with hairline borders + a tiny lift.
        'card':  '0 0 0 1px rgba(255,255,255,0.06)',
        'hover': '0 0 0 1px rgba(255,255,255,0.12), 0 1px 2px rgba(0,0,0,0.4)',
        'btn':   '0 0 0 1px rgba(255,255,255,0.08)',
        'sm':    '0 1px 2px rgba(0,0,0,0.4)',
      },
      fontFamily: {
        sans: ['"Inter"', '"SF Pro Text"', '"Segoe UI"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"SF Mono"', 'Menlo', 'Consolas', 'monospace'],
      },
      letterSpacing: {
        tightish: '-0.011em',
      },
    },
  },
  plugins: [],
}
