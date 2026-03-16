import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ["Syne", "sans-serif"],
        dm: ["DM Sans", "sans-serif"],
      },
      colors: {
        primary: "#00A2FF",
        eza: "#00C9A7",
        zuri: "#8B5CF6",
        bg: "#0A0F1E",
        surface: "#111827",
      },
      gridTemplateColumns: {
        "sidebar": "2fr 400px",
      },
    },
  },
  plugins: [],
};

export default config;
