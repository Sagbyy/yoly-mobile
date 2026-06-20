import { colors } from "@/shared/config/tokens";

export type StressInsightIcon = "drop" | "shield";

export interface StressInsight {
  icon: StressInsightIcon;
  color: string;
  title: string;
  meta?: string;
  text: string;
}

export const stressDetail = {
  level: 32,
  levelLabel: "Zone calme",
  levelWord: "Faible",
  note: "1 court pic détecté à l'école pendant la récréation.",

  curve: [
    22, 28, 25, 30, 42, 48, 55, 62, 75, 82, 78, 65, 52, 48, 42, 55, 68, 85, 72,
    58, 45, 38, 32, 28,
  ],
  curveTicks: ["00", "06", "12", "18", "24"],

  legend: [
    { label: "Calme", color: colors.health },
    { label: "Modéré", color: colors.warn },
    { label: "Élevé", color: colors.stress },
  ],

  insights: [
    {
      icon: "drop",
      color: colors.stress,
      title: "Pic · 14:32",
      meta: "4 min",
      text: "Détecté à l'École Jules Ferry. FC montée à 122 bpm.",
    },
    {
      icon: "shield",
      color: colors.health,
      title: "Semaine plus calme",
      text: "Stress moyen en baisse de 18% vs semaine dernière.",
    },
  ] as StressInsight[],
};
