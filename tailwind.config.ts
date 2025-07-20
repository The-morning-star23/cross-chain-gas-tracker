// Tailwind config with light theme only
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#3B82F6',
          light: '#E0F2FE',
          dark: '#1D4ED8',
        },
        card: '#FAFAFA',
        border: '#E5E7EB',
        text: '#1F2937',
        subtle: '#6B7280',
      },
      boxShadow: {
        soft: '0 4px 8px rgba(0,0,0,0.05)',
      },
      borderRadius: {
        xl: '1rem',
      },
    },
  },
  plugins: [],
};

export default config;
