/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // ─── Typography ───────────────────────────────────────────────
      fontFamily: {
        "geist-regular": ["Geist-Regular"],
        "geist-medium": ["Geist-Medium"],
        "geist-semibold": ["Geist-SemiBold"],
        "geist-bold": ["Geist-Bold"],
        "geist-mono": ["GeistMono-Regular"],
        "geist-mono-medium": ["GeistMono-Medium"],
      },
      fontSize: {
        display: ["56px", { lineHeight: "60px", letterSpacing: "-1.5px" }],
        title: ["32px", { lineHeight: "38px", letterSpacing: "-0.5px" }],
        h1: ["26px", { lineHeight: "32px", letterSpacing: "-0.3px" }],
        h2: ["20px", { lineHeight: "26px", letterSpacing: "-0.2px" }],
        body: ["15px", { lineHeight: "22px" }],
        caption: ["12px", { lineHeight: "16px" }],
        micro: ["10px", { lineHeight: "14px", letterSpacing: "0.8px" }],
      },

      // ─── Colors ───────────────────────────────────────────────────
      colors: {
        // Brand
        ink: "#0B0B0D",
        navy: "#0F1A33",
        accent: "#3D5AFE",
        bg: "#FFFFFF",

        // Semantic · Health
        health: {
          DEFAULT: "#2E9D74",
          sleep: "#5B6FB8",
          stress: "#C76A8E",
          warn: "#E5994B",
          alert: "#D04A4A",
        },
      },
    },
  },
  plugins: [],
};
