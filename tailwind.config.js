module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                dtech: {
                    "main-dark": "#3F0068",
                    "main-light": "#F0E2FA",
                    "main-grey": "#5F5F63",
                    "light-grey": "#F8F8F8",
                    "dark-grey": "#302D2D",
                    "additional-dark": "#9A65C4",
                    "primary-light": "#09c6f9",
                    "primary-dark": "#045DE9",
                    "middle-grey": "#E2E2E2",
                    "secondary-light": "#6E72FC",
                    "secondary-dark": "#AD1DEB",
                    "notification-alert": "#CB2020",
                    "notification-alert-secondary": "#EBB731",
                    "dark-teal": "#28A197",
                    "light-teal":"#6DCDCB",
                    "new-main-light":"#6E498E",
                    "light-grey2": "#EBEBEB",
                    "light-grey3": "#727272",
                    "dark-grey2": "#2D2D32",
                    "main-teal": "#4CA7A5",
                    "light-gray": "#FAFAFA",
                    "dark-blue":"#0065BD",
                    "light-blue":"#00437E",
                    "dark-yellow":"#FDD522"
                },
            },
            maxWidth: {
                site: "1440px",
            },
            fontSize: {
                xxs: "8px",
                m: "13px",
            },
            width: {
                3.5: "14px",
                50: "200px",
            },
            height: {
                3.5: "14px",
                26: "110px",
                15: "60px",
            },
            boxShadow: {
                underline: "inset 0px -1px 0px rgba(95, 86, 86, 0.25)",
                "custom-1": "0px 4px 7px rgba(95, 95, 99, 0.8)",
                "custom-3": "0px 3.5px 2px rgba(95, 95, 99, 0.1)",
                "list-shdaow": "0px 7px 3px rgba(95, 95, 99, 0.43)",
                container:
                    "inset 0px 1px 0px #B5B6BC, inset -1px 0px 0px #CACACB, inset 1px 0px 0px #CACACB;",
                "paper-shadow": "0px 0px 15px rgba(95, 95, 99, 0.3)",
                "custom-2": "0 0 5px rgb(160, 174, 192)",
                "custom-4": "1px 1px 5px 3px rgba(160, 174, 192, 1)",
                "custom-5": "4px 4px 10px 4px rgba(160, 174, 192, 1)",
                "custom-6": "0px 4px 10px 1px rgba(0, 0, 0, 0.50)",
                "card-shadow":"2px 2px 7px 7px rgba(146, 146, 146, 0.1)",
                "hover-shadow":"2px 2px 7px 8px rgba(146, 146, 146, 0.15)",
                "topic-card": "4px 4px 4px 0px rgba(146, 146, 146, 0.25)",
                "search-card": "4px 4px 15px 0 rgba(0, 0, 0, 0.1)",
                "search-card-hover": "4px 4px 15px 0 rgba(0, 0, 0, 0.15)",
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
