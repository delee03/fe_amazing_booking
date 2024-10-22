/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            container: {
                center: true,
                screens: {
                    DEFAULT: "90%",
                    sm: "520px",
                    md: "768px",
                    lg: "1024px",
                    xl: "1280px",
                    "2xl": "1300px",
                },
            },
            textColor: {
                main: "#FF385C",
            },
            backgroundColor: {
                // Changed from bgColor to backgroundColor
                main: "#EF4444",
            },
        },
    },
    plugins: [],
};
