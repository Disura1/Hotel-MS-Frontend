/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        c1: "#007F73",
        c2: "#4CCD99",
        c3: "#FFC700",
        c4: "#FFF455"
      },
    },
  },
  plugins: [],
};