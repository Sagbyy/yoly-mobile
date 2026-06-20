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
        ink: { DEFAULT: "#0B0B0D", 2: "#5C5C63", 3: "#9A9AA1", 4: "#C7C7CC" },
        navy: { DEFAULT: "#0F1A33", 2: "#1B2A4E", soft: "#EFF1F7" },
        accent: { DEFAULT: "#3D5AFE", soft: "#E8ECFF" },
        bg: { DEFAULT: "#FFFFFF", soft: "#F6F6F8" },

        // Neutrals · surfaces
        surface: { DEFAULT: "#FFFFFF", 2: "#FAFAFB", 3: "#F2F2F4" },

        // Semantic · Health
        heart: "#D04A4A",
        health: {
          DEFAULT: "#2E9D74",
          soft: "#E5F2EC",
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
