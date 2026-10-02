/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkClass: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#020617',      // slate-950
          card: '#0f172a',    // slate-900
          border: '#1e293b',  // slate-800
          muted: '#334155',   // slate-700
          accent: '#06b6d4',  // cyan-500
          glow: '#2563eb',    // blue-600
        }
      },
      boxShadow: {
        'cyan-glow': '0 0 20px -5px rgba(6, 182, 212, 0.4)',
        'blue-glow': '0 0 20px -5px rgba(37, 99, 235, 0.4)',
      }
    },
  },
  plugins: [],
}
