/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'header-bg': '#FFFFFF',
        'header-text': '#333333',
        'body-bg': '#F8F9FA',
        'body-text': '#212529',
        'footer-bg': '#343A40',
        'footer-text': '#DEE2E6',
        'footer-link': '#85A3FF',
        'primary-accent': '#6C63FF',
      }
    },
  },
  plugins: [],
}