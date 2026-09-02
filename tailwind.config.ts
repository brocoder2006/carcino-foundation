import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#0B0F1A", // near-black navy background
          900: "#12161F", // card surface
          800: "#1A202C", // hover card surface
          700: "#242C3F",
        },
        teal: {
          DEFAULT: "#1FB6A8",
          light: "#34D1C2",
          dark: "#17968A",
          glow: "rgba(31, 182, 168, 0.25)",
        },
        pride: {
          red: "#FF5A5F",
          orange: "#FFB84D",
          yellow: "#FFE566",
          green: "#4CD97B",
          blue: "#4DA3FF",
          purple: "#A66DFF",
        },
      },
      fontFamily: {
        wintersolace: ["'Winter Solace'", "serif"],
        heading: ["'Winter Solace'", "'Familjen Grotesk'", "var(--font-inter-tight)", "Inter", "sans-serif"],
        body: ["'Familjen Grotesk'", "var(--font-inter)", "sans-serif"],
        galindo: ["'Galindo'", "cursive", "sans-serif"],
        oleo: ["'Oleo Script'", "cursive", "serif"],
        quote: ["var(--font-fraunces)", "Georgia", "serif"],
        editorial: ["var(--font-cormorant)", "Georgia", "serif"],
        instrument: ["var(--font-instrument)", "Georgia", "serif"],
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        cinzel: ["var(--font-cinzel)", "Cinzel Decorative", "serif"],
      },
      boxShadow: {
        glass: "0 0 0 1px rgba(255, 255, 255, 0.08)",
        "glass-hover": "0 0 0 1px rgba(31, 182, 168, 0.4), 0 20px 40px rgba(0, 0, 0, 0.4)",
        "teal-glow": "0 0 25px rgba(31, 182, 168, 0.35), 0 0 50px rgba(31, 182, 168, 0.15)",
        "pride-glow": "0 10px 40px -10px rgba(166, 109, 255, 0.2)",
      },
      animation: {
        "ken-burns": "kenBurns 12s ease-in-out infinite alternate",
        "float-subtle": "floatSubtle 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
      },
      keyframes: {
        kenBurns: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.05)" },
        },
        floatSubtle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

