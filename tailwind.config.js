module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dtech: {
          "primary-light": "#09c6f9",
          "primary-dark": "#045DE9",
          "secondary-light": "#6E72FC",
          "secondary-dark": "#AD1DEB",
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
