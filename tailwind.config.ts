import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fdf8f3',
          100: '#f5ede3',
          200: '#edddd0',
        },
        rose: {
          900: '#4a3328',
          700: '#7a6458',
          500: '#b89678',
        },
        gold: {
          400: '#c9a882',
          300: '#dfc4a0',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-jost)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        site: '1200px',
      },
    },
  },
  plugins: [],
}

export default config
