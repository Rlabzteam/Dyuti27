/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        editorial: {
          deepnavy: '#071A33',
          navy: '#12345B',
          navyLight: '#1E4A7D',
          offwhite: '#F5F5F0',
          white: '#FFFFFF',
          softblue: '#E8F0F7',
          lightblue: '#E8F0F7',
          border: '#D9DEE5',
          borderSubtle: '#EAEFF5',
          muted: '#667085',
          text: '#0B1220',
          blue: '#2563EB',
          blueLight: '#EFF6FF',
          blueDark: '#1D4ED8',
        },
        navy: {
          950: '#040F1E',
          900: '#071A33',
          800: '#12345B',
          700: '#1B477A',
          600: '#255D9E',
          500: '#3477C2',
          100: '#E8F0F7',
          50: '#F5F5F0',
        },
      },
      fontFamily: {
        sans: ['"Outfit"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Outfit"', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['"Outfit"', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', '"Outfit"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'editorial-tight': '-0.03em',
        'editorial-wide': '0.15em',
      },
      borderRadius: {
        'btn': '14px',
        'img': '18px',
        'card': '20px',
        'container': '24px',
        'panel': '28px',
        'pill': '999px',
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(7, 26, 51, 0.04), 0 1px 2px rgba(7, 26, 51, 0.02)',
        'editorial': '0 12px 32px -4px rgba(7, 26, 51, 0.08), 0 4px 12px -2px rgba(7, 26, 51, 0.04)',
        'float': '0 16px 36px -6px rgba(7, 26, 51, 0.16)',
        'card': '0 4px 20px -2px rgba(7, 26, 51, 0.05)',
      },
    },
  },
  plugins: [],
}
