import type { Config } from 'tailwindcss'

// Brand colours are CSS variables (see the top of src/index.css) so the whole site is re-themed in one place.
const withVar = (name: string) => `rgb(var(${name}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // The 5-colour palette: bg-brand-lightest, text-brand-darkest, border-brand-light, ...
        brand: {
          lightest: withVar('--color-lightest'), // #cde7ca
          light: withVar('--color-light'), //       #b2d4b6
          medium: withVar('--color-medium'), //     #90b493
          muted: withVar('--color-muted'), //       #728370
          darkest: withVar('--color-darkest'), //   #4b514a
        },
        // Semantic aliases used throughout the components (mapped onto the palette above).
        primary: { DEFAULT: withVar('--color-darkest'), dark: withVar('--color-darkest') },
        accent: { DEFAULT: withVar('--color-medium'), soft: withVar('--color-lightest') },
        ink: withVar('--color-darkest'),
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
} satisfies Config
