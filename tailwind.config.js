/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFFDF6',
        secondary: '#FAF6E9',
        accent: '#DDEB9D',
      }
    },
  },
  plugins: [],
}