import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class', // Only activate dark mode when 'dark' class is on html element
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#F5F0E8',
        'text-primary': '#1A1A1A',
        'accent-yellow': '#FFD60A',
        'accent-blue': '#003566',
        'text-secondary': '#4A4A4A',
        'white': '#FFFFFF',
      },
    },
  },
  plugins: [],
}
export default config