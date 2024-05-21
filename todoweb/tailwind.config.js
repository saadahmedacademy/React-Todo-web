/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'your-custom-image': "url('backimg.jpg')",
        // Add more custom images as needed
      }
    },
  },
  plugins: [],
}