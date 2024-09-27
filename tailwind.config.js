/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'text-primary': '#2a2a2a',
      'background-primary': '#ffffff',
      'background-tertiary': '#f5f5f5',
      'border-secondary': '#d8d8d8',
      'brand-primary': '#ac004b',
      'brand-secondary': '#79083a',
      'red': '#ff0000',
      'white': '#ffffff',
    },
    fontFamily: {
      primary: ['Open Sans', 'Noto Sans JP', 'sans-serif']
    },
    extend: {
      spacing: {
        '7.5': '1.875rem',
        '1.625': '0.40625rem',
        '4.5': '1.125rem',
        '27': '6.75rem',
        '50': '12.5rem',
      }
    }
  },
  plugins: []
}
