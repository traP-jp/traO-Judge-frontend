/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'background-primary': '#ffffff',
      'background-secondary': '#f5f5f5',
      'background-tertiary': '#f0f0f0',
      'background-inv-primary': '#252525',
      'border-primary': '#d4d4d4',
      'border-secondary': '#eaeaea',
      'brand-primary': '#ac004b',
      'brand-secondary': '#79083a',
      'brand-light-primary': '#fff3f3',
      'text-primary': '#2a2a2a',
      'text-secondary': '#4a4a4a',
      'text-tertiary': '#909090',
      'text-inv-primary': '#ffffff',
      'status-error': '#e02a2a',
      red: '#ff0000',
      white: '#ffffff',
      transparent: 'transparent'
    },
    fontFamily: {
      primary: ['Open Sans', 'Noto Sans JP', 'sans-serif']
    },
    extend: {
      spacing: {
        1.625: '0.40625rem',
        1.75: '0.4375rem',
        4.5: '1.125rem',
        5.5: '1.375rem',
        6.5: '1.625rem',
        7.5: '1.875rem',
        11.5: '2.875rem',
        18: '4.5rem',
        27: '6.75rem',
        37: '9.25rem',
        50: '12.5rem',
        58: '14.5rem',
        62.5: '15.625rem',
        82: '20.5rem',
        78: '19.5rem',
        90: '22.5rem',
        120: '30rem',
        172: '43rem',
        200: '50rem'
      },
      borderRadius: {
        15: '15px'
      },
      height: {
        'header-offset': 'calc(100vh - 56px)'
      },
      maxWidth: {
        'form-max': '600px',
        'profile-max': '500px'
      },
      padding: {
        'container-x': '120px'
      }
    }
  },
  plugins: []
}
