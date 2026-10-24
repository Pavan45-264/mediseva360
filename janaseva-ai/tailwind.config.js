/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        groww: {
          bg: '#FFFFFF',
          subtle: '#F5F6F8',
          border: '#E8E8EC',
          heading: '#44475B',
          secondary: '#7C7E8C',
          green: '#00D09C',
          'green-dark': '#00B386',
          'green-tint': '#E6F9F4',
          blue: '#5367FF',
          'blue-tint': '#EEF0FF',
          red: '#EB5B3C',
          'red-tint': '#FDEEEA',
          amber: '#FFA24C',
          yellow: '#F5C451',
          // Dark tokens
          darkBg: '#121212',
          darkCard: '#1B1B1B',
          darkBorder: '#2C2C2C',
          darkText: '#FFFFFF',
          darkSecondary: '#9A9A9A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        'groww': '12px',
        'groww-lg': '16px',
        'groww-pill': '9999px',
      },
      boxShadow: {
        'groww-card': '0 1px 3px 0 rgba(0, 0, 0, 0.04)',
        'groww-modal': '0 -4px 24px 0 rgba(0, 0, 0, 0.12)',
        'groww-subtle': '0 2px 8px 0 rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}
