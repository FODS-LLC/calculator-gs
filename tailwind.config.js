module.exports = {
  purge: {
    enabled: true,
    content: [
    './public/**/*.html',
    './public/*.html',
    './public/js/*.js',
    './public/css/*.css'
  ]
},
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        'print': {'raw': 'print'}
      },
      colors: {
        fodsYellow: '#f8d146'
      },
      minWidth: {
        '1': '3.5rem',
        '2': '4rem',
        'label': '6.4rem'
      },
      maxWidth: {
        '1': '3.5rem',
        '2': '4rem',
        'label': '6.4rem'
      },
      width: {
        '1': '3.5rem',
        '2': '4rem',
        'label': '6.6rem'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
