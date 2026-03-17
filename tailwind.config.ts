import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Plus Jakarta Sans", "sans-serif"],
        sans: ["Plus Jakarta Sans", "sans-serif"],
        serif: ["Instrument Serif", "serif"],
      },

      colors: {
        /* ── Brand ─────────────────────────────── */
        brand: {
          DEFAULT: "#00A2FF",
          dark: "#007ACC",
          darker: "#005C99",
        },
        eza: { DEFAULT: "#00C9A7" },
        zuri: { DEFAULT: "#8B5CF6" },

        /* ── Light surface system ───────────────── */
        ink: {
          900: "#0B1016" /* near-black text         */,
          700: "#1E2A36" /* headings                */,
          500: "#3D4E5C" /* secondary text          */,
          300: "#7B8FA0" /* muted / placeholder     */,
          100: "#BDC8D2" /* disabled                */,
        },
        wire: {
          300: "#D4DBE2" /* default border          */,
          200: "#E6EAEE" /* subtle divider          */,
          100: "#F2F5F7" /* surface alt             */,
          50: "#F9FAFB" /* page background         */,
        },

        /* ── Dark (footer/hero) ─────────────────── */
        navy: {
          950: "#060B14",
          900: "#0A0F1E",
          800: "#0F1828",
          700: "#172035",
          600: "#1E2D45",
        },
      },

      /* ── Sharp shadow system ─────────────────── */
      boxShadow: {
        /* Offset shadows - "edge" aesthetic */
        "edge-sm": "3px 3px 0px 0px #00A2FF",
        "edge-md": "4px 4px 0px 0px #00A2FF",
        "edge-dark": "4px 4px 0px 0px #0A0F1E",
        /* Crisp elevation - no blur */
        "crisp-sm": "0 1px 0 0 #D4DBE2, 1px 0 0 0 #D4DBE2, -1px 0 0 0 #D4DBE2, 0 -1px 0 0 #D4DBE2",
        /* Standard utility */
        lift: "0 4px 16px rgba(11,16,22,0.10)",
        "lift-lg": "0 12px 40px rgba(11,16,22,0.14)",
        "brand-glow": "0 0 24px rgba(0,162,255,0.22)",
        /* Dropdown */
        dropdown: "0 8px 32px rgba(11,16,22,0.12), 0 2px 8px rgba(11,16,22,0.08)",
      },

      /* ── No rounding by default - sharp geometry */
      borderRadius: {
        DEFAULT: "0px",
        none: "0px",
        sm: "2px" /* micro: interactive elements only */,
        md: "4px" /* modest rounding max              */,
        lg: "6px" /* used sparingly                   */,
      },

      /* ── Type scale ──────────────────────────── */
      fontSize: {
        "2xs": ["10px", { lineHeight: "14px", letterSpacing: "0.08em" }],
        xs: ["11px", { lineHeight: "16px", letterSpacing: "0.04em" }],
        sm: ["13px", { lineHeight: "20px" }],
        base: ["15px", { lineHeight: "24px" }],
        md: ["17px", { lineHeight: "28px" }],
        lg: ["20px", { lineHeight: "30px" }],
        xl: ["24px", { lineHeight: "32px", letterSpacing: "-0.02em" }],
        "2xl": ["30px", { lineHeight: "38px", letterSpacing: "-0.025em" }],
        "3xl": ["38px", { lineHeight: "46px", letterSpacing: "-0.03em" }],
        "4xl": ["48px", { lineHeight: "56px", letterSpacing: "-0.035em" }],
        "5xl": ["60px", { lineHeight: "68px", letterSpacing: "-0.04em" }],
        "6xl": ["74px", { lineHeight: "80px", letterSpacing: "-0.045em" }],
      },

      /* ── Spacing additions ───────────────────── */
      spacing: {
        "18": "72px",
        "22": "88px",
        "26": "104px",
        "30": "120px",
        "34": "136px",
      },

      /* ── Grid helpers ────────────────────────── */
      gridTemplateColumns: {
        "footer-lg": "4fr 2fr 2fr 2fr 2fr",
        "12": "repeat(12, minmax(0, 1fr))",
      },

      /* ── Transitions ─────────────────────────── */
      transitionDuration: {
        "150": "150ms",
        "250": "250ms",
      },

      /* ── Keyframes ───────────────────────────── */
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-left": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.3s ease both",
        "fade-in": "fade-in 0.2s ease both",
        "slide-left": "slide-left 0.3s ease both",
        blink: "blink 1s step-end infinite",
      },
    },
  },
  plugins: [],
};

export default config;
