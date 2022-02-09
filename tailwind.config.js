module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vibani: {
          brand: "#FBFE27",
          black: "#000000",
          "light-white": "#E9F1F7",
          "dark-white": "#D2E2EF",
        },
      },
      maxWidth: {
        site: "1440px",
      },
      fontSize: {
        xxs: "8px",
      },
    },
  },
  plugins: [],
};
