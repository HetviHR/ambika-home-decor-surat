import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  darkMode: "class",

  theme: {
    container: {
      center: true,
      padding: "1.5rem",

      screens: {
        "2xl": "1400px",
      },
    },

    extend: {

      colors: {

        background: "#F8F5F0",      // off white
        cream: "#EFE8DD",

        beige: "#D8C8B8",

        warmGray: "#8A817C",

        dark: "#1F1F1F",

        accent: "#2D5F73",

        border: "#E5E0DA",

        card: "#FFFFFF",

        muted: "#F3F1EE",
      },

      fontFamily: {

        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui"
        ],

        display: [
          "Playfair Display",
          "serif"
        ],
      },

      borderRadius: {

        xl: "1rem",

        "2xl": "1.5rem",
      },

      boxShadow: {

        luxury:
          "0 20px 40px rgba(0,0,0,0.08)",

        soft:
          "0 8px 24px rgba(0,0,0,0.05)",
      },

      transitionTimingFunction: {

        premium:
          "cubic-bezier(0.22,1,0.36,1)",
      },
    },
  },

  plugins: [],
};

export default config;