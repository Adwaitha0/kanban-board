/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        containerColor:'#262626',
        inputColor: '#323232', 

      },
      fontFamily: {
        'sf-display': ['"SF Pro Display"', 'sans-serif'],
        'sf-text': ['"SF Pro Text"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
