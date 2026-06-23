import type { Alert, CriticalAlert } from "./types";

export const criticalAlert: CriticalAlert = {
  tag: "Critique",
  timeAgo: "il y a 2 min",
  headline: "Rythme cardiaque accéléré",
  description:
    "La fréquence cardiaque de Maya a atteint 122 bpm à 10:14 pendant la récréation.",
  primaryAction: "Voir sur la carte",
  secondaryAction: "Appeler Maya",
  category: "health",
};

export const alerts: Alert[] = [
  {
    id: "stress-peak",
    tone: "stress",
    icon: "drop",
    title: "Pic de stress détecté",
    detail: "14:32 · École Jules Ferry · 4 min",
    timeAgo: "il y a 14 min",
    category: "health",
  },
  {
    id: "battery-low",
    tone: "warn",
    icon: "battery",
    title: "Batterie de la montre faible",
    detail: "Montre de Maya à 18% · à recharger ce soir",
    timeAgo: "il y a 1 h",
    category: "safety",
  },
  {
    id: "left-safe-zone",
    tone: "accent",
    icon: "pin",
    title: "Zone de sécurité quittée",
    detail: "Maya a quitté l'école à 16:05",
    timeAgo: "il y a 2 h",
    category: "safety",
  },
  {
    id: "goal-reached",
    tone: "health",
    icon: "steps",
    title: "Objectif quotidien atteint",
    detail: "10 248 pas aujourd'hui — belle marche !",
    timeAgo: "À l'instant",
    category: "health",
  },
  {
    id: "watch-online",
    tone: "neutral",
    icon: "signal",
    title: "Montre de nouveau en ligne",
    detail: "Reconnectée en Wi-Fi · réseau domestique",
    timeAgo: "il y a 3 h",
    category: "safety",
  },
];
