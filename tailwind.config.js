module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dtech: {
          "main-dark":"#3F0068",
          "primary-light": "#09c6f9",
          "primary-dark": "#045DE9",
          "secondary-light": "#6E72FC",
          "secondary-dark": "#AD1DEB",
          "notification-alert" : "#CB2020",
          "notification-alert-secondary": "#EBB731"
        },
      },
      maxWidth: {
        site: "1440px",
      },
      fontSize: {
        xxs: "8px",
      },
      width: {
        '50': '200px'
      },
      height: {
        '26' : '110px'
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
