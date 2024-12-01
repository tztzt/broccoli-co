/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "mobile-sm": "0.75rem", // Small text for mobile (8px)
        "mobile-lg": "1.5rem", // Large text for mobile (22px)
        "desktop-sm": "1.5rem", // Small text for desktop (16px)
        "desktop-lg": "3rem", // Large text for desktop (48px)
        button: "1.25rem", // Large text for desktop (48px)
        "button-mobile": "0.5rem", // Large text for desktop (48px)
      },
    },
  },
  plugins: [],
};
