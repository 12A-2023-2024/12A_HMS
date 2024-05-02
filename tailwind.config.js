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
      colors: {
          'beige': '#fefae0',
          'dark-blue': '#231F20',
          'card-color': '#FAEDCD',
          'dark-beige': '#9D947E',
      },
    },
  },
  plugins: [],
}

