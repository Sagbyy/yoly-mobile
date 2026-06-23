export interface QuietModeRule {
  id: string;
  label: string;
  enabled: boolean;
}

export const quietModeDefaults = {
  name: "Mode école",
  dayLabels: ["L", "M", "M", "J", "V", "S", "D"],
  selectedDays: [0, 1, 2, 3, 4],
  timeFrom: "08:30",
  timeTo: "15:30",
  rules: [
    { id: "block-calls", label: "Bloquer les appels entrants", enabled: true },
    { id: "mute-notifs", label: "Couper les notifications sur la montre", enabled: true },
    { id: "allow-sos", label: "Autoriser le SOS d'urgence", enabled: true },
    { id: "keep-health", label: "Continuer le suivi santé", enabled: true },
    { id: "hide-screen", label: "Masquer l'écran à l'école", enabled: false },
  ] as QuietModeRule[],
};
