/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a1a1a',
          light: '#2a2a2a',
        },
        accent: {
          DEFAULT: '#007AFF',
          light: '#3395FF',
        },
        surface: {
          DEFAULT: '#ffffff',
          dark: '#f5f5f5',
          darker: '#e0e0e0',
        },
        text: {
          white: '#ffffff',
          light: '#666666',
          dark: '#1a1a1a',
        },
        neutral: {
          light: '#f5f5f5',
          DEFAULT: '#e0e0e0',
          dark: '#666666',
        },
      },
      borderRadius: {
        custom: '1rem',
      },
      boxShadow: {
        'custom': '0 4px 20px rgba(0, 0, 0, 0.16)',
        'custom-hover': '0 8px 30px rgba(0, 0, 0, 0.24)',
        'custom-lg': '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.09)',
        'custom-inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.09)',
        'custom-elevated': '0 10px 20px rgba(0, 0, 0, 0.15), 0 6px 6px rgba(0, 0, 0, 0.09)',
        'custom-dark': '0 6px 30px -6px rgba(0, 0, 0, 0.24), 0 0 0 1px rgba(0, 0, 0, 0.05)',
        'custom-dark-hover': '0 12px 40px -8px rgba(0, 0, 0, 0.32), 0 0 0 1px rgba(0, 0, 0, 0.08)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-surface': 'linear-gradient(to bottom right, #ffffff, #f5f5f5)',
        'gradient-surface-dark': 'linear-gradient(to bottom right, #f5f5f5, #e0e0e0)',
      },
      spacing: {
        'section': '5rem',
      },
    },
  },
  plugins: [],
}
