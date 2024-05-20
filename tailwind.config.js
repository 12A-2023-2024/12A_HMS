/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
     },
     margin: {
      'auto': 'auto',
    },
    height: {
      'big' : '8000px'
    },
    },
  },
  plugins: [],
}

