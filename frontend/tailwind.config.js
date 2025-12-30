/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Orbitron", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 25px rgba(99,102,241,.35), 0 0 60px rgba(34,211,238,.18)",
      },
    },
  },
  plugins: [],
};


