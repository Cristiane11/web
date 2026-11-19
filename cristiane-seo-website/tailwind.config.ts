import type { Config } from 'tailwindcss'

// Brand colours are CSS variables (see src/index.css) so they are easy to tweak in one place.
const withVar = (name: string) => `rgb(var(${name}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: withVar('--color-primary'), dark: withVar('--color-primary-dark') },
        accent: { DEFAULT: withVar('--color-accent'), soft: withVar('--color-accent-soft') },
        ink: withVar('--color-ink'),
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
} satisfies Config
