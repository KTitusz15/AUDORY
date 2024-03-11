/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xsm': { 'raw': '(min-width: 360px)' },
        'xsm1': { 'raw': '(min-width: 390px)' }
      }
    },
  },
  plugins: [
    require('tailwind-typewriter')({
      wordsets: {
        login: {
            words: ['/ouh:douri/', 'A place to discuss your sound', 'Receive Feedback', 'Give Feedback', 'Make yourself heard'],
            delay: 0.5,
            writeSpeed: 0.15,
            eraseSpeed: 0.05,
            pauseBetween: 1
        }
    }
    }),
    require("tailwind-gradient-mask-image")
  ],
  
}

