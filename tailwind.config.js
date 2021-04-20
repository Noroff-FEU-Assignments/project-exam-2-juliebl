module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FF612A',
          DEFAULT: '#FF4606',
          dark: '#FF1A00',
        },
        neutral: {
          light: '#F6F7F8',
          DEFAULT: '#5c6ac4',
          dark: '#202e78',
        },
        secondary: {
          light: '#EEF2FF',
          DEFAULT: '#001D2F',
          dark: '#202e78',
        },
        success: {
          DEFAULT: '#E0F1E7',
          dark: '#0E6630',
        },
        warning: {
          DEFAULT: '#FFF89C',
          dark: '#B8850F',
        },
        danger: {
          DEFAULT: '#FFBDAC',
          dark: '#BC0000',
        },
        loading: {
          light: '#FFF',
          DEFAULT: '#F6F7F8',
          dark: '#153044',
        },
      },
      animation: {
        'spin-reverse': 'spin-reverse 2s linear infinite',
      },
      keyframes: {
        'spin-reverse': {
          '0%': {
            transform: 'rotate(-90deg), rotate(-89deg)',
          },
          '100%': { transform: 'rotate(-357deg)' },
        },
      },
    },
  },

  variants: {
    extend: {},
  },
  plugins: [],
};
