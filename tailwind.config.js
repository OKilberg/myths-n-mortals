/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      cursor: {
        'attack':'url("./gladius.svg"), auto',
        'move':'url("./wingfoot.svg"), auto',
        'spawn':'url("./cement-shoes.svg"), auto'
      }
    },
  },
  plugins: [],
}

