/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        react: "#61DAFB",
        javascript: "#F7DF1E",
        html: "#E34F26",
        css: "#1572B6",
        typescript: "#3178C6"
      },
      boxShadow: {
        "inset-gray": "inset 0 10px 10px 0 rgba(75, 75, 75, 0.6)", // Gris
        "inset-mauve": "inset 0 10px 10px 0 rgba(147, 112, 219, 0.8)", // Gris plus foncé
      },
    },
  },
  plugins: [],
};
