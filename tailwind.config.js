export default {
  content: ['./index.html', './src/**/*.{html,js,ts,jsx,tsx}'], // ✅ Includes all components
  darkMode: 'class',
  theme: {
    extend: {},
    screens: {
      sm: '320px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
  plugins: [],
};
