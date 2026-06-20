/**
 * Raw color values mirroring the NativeWind palette in tailwind.config.js.
 * Use these where a className can't reach — SVG `color`/`stroke` props,
 * gradients, and other inline style values.
 */
export const colors = {
  ink: "#0B0B0D",
  ink2: "#5C5C63",
  ink3: "#9A9AA1",
  ink4: "#C7C7CC",
  navy: "#0F1A33",
  accent: "#3D5AFE",
  surface: "#FFFFFF",

  heart: "#D04A4A",
  health: "#2E9D74",
  sleep: "#5B6FB8",
  stress: "#C76A8E",
  warn: "#E5994B",
  alert: "#D04A4A",

  // Soft tints (≈ color the icon chips / banners are filled with)
  surface3: "#F2F2F4",
  accentSoft: "#E8ECFF",
  healthSoft: "#E5F2EC",
  sleepSoft: "#ECEEFA",
  stressSoft: "#FBEDF3",
  warnSoft: "#FCEEDC",
  alertSoft: "#FBE9E8",

  liveDot: "#52E0A9",
} as const;
