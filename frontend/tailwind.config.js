/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        surface: '#FFFFFF',
        canvas: '#F8FAFC',
        edge: '#E2E8F0',
        content: {
          main: '#0F172A',
          secondary: '#475569',
          muted: '#64748B',
        },
        dark: {
          bg: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
          muted: '#64748B',
          accent: '#2563EB',
          glow: '#2563EB',
        }
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px 0 rgba(15, 23, 42, 0.03)',
        'card-hover': '0 4px 12px -2px rgba(15, 23, 42, 0.08), 0 2px 6px -1px rgba(15, 23, 42, 0.04)',
        'cyan-glow': '0 2px 8px -1px rgba(37, 99, 235, 0.15)',
        'blue-glow': '0 2px 8px -1px rgba(37, 99, 235, 0.15)',
      }
    },
  },
  plugins: [],
}
