/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#CCD524',
          50: '#F7F9E1',
          100: '#F2F4CE',
          200: '#E8EBA8',
          300: '#DDE282',
          400: '#CCD524',
          500: '#B8C020',
          600: '#959C1A',
          700: '#717515',
        },
        secondary: {
          DEFAULT: '#0F3D70',
          50: '#E6EEF7',
          100: '#CCDDEF',
          200: '#99BBDF',
          300: '#6699CF',
          400: '#3377BF',
          500: '#0F3D70',
          600: '#0D3563',
          700: '#0B2D56',
        },
        accent: {
          DEFAULT: '#6BB333',
          50: '#F0F7EC',
          100: '#E1EFD9',
          200: '#C3DFB3',
          300: '#A5CF8D',
          400: '#87BF67',
          500: '#6BB333',
          600: '#5F9D2D',
          700: '#538727',
        },
        emerald: {
          DEFAULT: '#34D399',
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399', // Color base
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
      },
    },
  },
  darkMode: 'class',
}
