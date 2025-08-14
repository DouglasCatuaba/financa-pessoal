/**
 * Tailwind CSS configuration for the Finança Pessoal app.
 *
 * This file defines the colour palette, font family and dark mode
 * settings according to the design system described in the project
 * specification. Content paths are configured to ensure Tailwind can
 * tree‑shake unused styles.
 */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        success: '#16a34a',
        warning: '#f59e0b',
        danger: '#dc2626',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};