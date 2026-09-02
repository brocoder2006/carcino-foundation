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
          950: "#0F0A1C", // rich royal purple dark background
          900: "#180D2E", // purple card surface
          800: "#231245", // hover purple card surface
          700: "#2E1858",
        },
        teal: {
          DEFAULT: "#C084FC", // electric purple accent
          light: "#E9D5FF",
          dark: "#9333EA",
          glow: "rgba(192, 132, 252, 0.3)",
        },
        pride: {
          red: "#FF5A5F",
          orange: "#FFB84D",
          yellow: "#FFE566",
          green: "#4CD97B",
          blue: "#4DA3FF",
          purple: "#C084FC",
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
        glass: "0 0 0 1px rgba(255, 255, 255, 0.12)",
        "glass-hover": "0 0 0 1px rgba(192, 132, 252, 0.5), 0 20px 40px rgba(0, 0, 0, 0.6)",
        "teal-glow": "0 0 25px rgba(192, 132, 252, 0.45), 0 0 50px rgba(168, 85, 247, 0.25)",
        "pride-glow": "0 10px 40px -10px rgba(192, 132, 252, 0.3)",
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
