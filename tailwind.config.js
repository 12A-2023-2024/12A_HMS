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
        'big': '6000px'
      },
      width: {
        '1/7': '14.2857143%',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
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
