module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust based on your file locations
  ],
  theme: {
    extend: {
      fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
      montserrat: ['Montserrat', 'sans-serif'],},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
} }
