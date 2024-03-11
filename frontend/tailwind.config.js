/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
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
    })
  ],
}

