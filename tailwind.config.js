/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'background-primary': '#ffffff',
      'background-secondary': '#f0f0f0',
      'background-tertiary': '#f5f5f5',
      'background-inv-primary': '#252525',
      'border-primary': '#bfbfbf',
      'border-secondary': '#d8d8d8',
      'brand-primary': '#ac004b',
      'brand-secondary': '#79083a',
      'brand-light-primary': '#fff3f3',
      'text-primary': '#2a2a2a',
      'text-secondary': '#6c6c6c',
      'text-tertiary': '#9a9a9a',
      'text-inv-primary': '#f0f0f0',
      'status-error': '#e02a2a',
      'red': '#ff0000',
      'white': '#ffffff',
    },
    fontFamily: {
      primary: ['Open Sans', 'Noto Sans JP', 'sans-serif']
    },
    extend: {
      spacing: {
        '1.625': '0.40625rem',
        '1.75': '0.4375rem',
        '4.5': '1.125rem',
        '7.5': '1.875rem',
        '11.5': '2.875rem',
        '27': '6.75rem',
        '50': '12.5rem',
        '62.5': '15.625rem'
      }
    }
  },
  plugins: []
}
