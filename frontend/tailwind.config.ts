import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#030712",
          900: "#050816",
          800: "#0B1120",
          700: "#111827",
          600: "#1e293b",
          500: "#334155",
        },
        accent: {
          DEFAULT: "#38bdf8",
          50: "#e0f7ff",
          100: "#b8ecfe",
          200: "#7dd3fc",
          300: "#38bdf8",
          400: "#0ea5e9",
          500: "#0284c7",
        },
        cyan: {
          glow: "#22d3ee",
        },
        slate: {
          DEFAULT: "#8892b0",
          light: "#a8b2d1",
          lighter: "#ccd6f6",
          lightest: "#e6f1ff",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-up": "fadeUp 0.6s ease-out",
        "slide-in": "slideIn 0.5s ease-out",
        "glow": "glow 2s ease-in-out infinite alternate",
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "border-glow": "border-glow 4s ease-in-out infinite",
        "spin-slow": "spin 12s linear infinite",
        "drift": "drift 20s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(56, 189, 248, 0.15)" },
          "100%": { boxShadow: "0 0 30px rgba(56, 189, 248, 0.35)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%, 100%": { backgroundPosition: "0% center" },
          "50%": { backgroundPosition: "200% center" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4", filter: "blur(20px)" },
          "50%": { opacity: "0.8", filter: "blur(35px)" },
        },
        "border-glow": {
          "0%, 100%": { borderColor: "rgba(56, 189, 248, 0.1)" },
          "50%": { borderColor: "rgba(56, 189, 248, 0.35)" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(10px, -15px)" },
          "50%": { transform: "translate(-10px, 10px)" },
          "75%": { transform: "translate(15px, 5px)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
