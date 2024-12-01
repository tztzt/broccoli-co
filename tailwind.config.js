/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        'mobile-sm': '1rem',
        'mobile-md': '1.5rem',
        'mobile-lg': '2rem',
        'desktop-sm': '1.5rem',
        'desktop-md': '2rem',
        'desktop-lg': '3rem',
        button: '1.25rem',
        'button-mobile': '0.5rem',
      },
    },
  },
  plugins: [],
};
