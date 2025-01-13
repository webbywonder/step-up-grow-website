module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // You can extend the default Tailwind theme here
      colors: {
        primary: "#3B82F6", // Example: customizing the primary color
      },
      fontFamily: {
        sans: ["Arial", "sans-serif"],
      },
    },
  },
  plugins: [
    // Add any Tailwind plugins here
  ],
};
