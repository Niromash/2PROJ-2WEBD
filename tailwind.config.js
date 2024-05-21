/** @type {import('tailwindcss').Config} */
const config = {
    content: ["./src/app.html", "./src/**/*.{jsx,tsx,js,ts}"],
    darkMode: "class", // or 'media' or 'class'
    theme: {
        extend: {}
    },
    variants: {
        extend: {}
    }
};

export default config;