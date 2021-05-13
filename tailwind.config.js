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
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
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
