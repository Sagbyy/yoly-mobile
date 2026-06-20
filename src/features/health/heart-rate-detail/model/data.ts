import { colors } from "@/shared/config/tokens";

export interface HeartDetection {
  time: string;
  title: string;
  detail: string;
  color: string;
}

export const heartRateDetail = {
  resting: 72,
  ageNote: "sain pour 8 ans",
  deltaText: "3 bpm vs semaine",
  rangeText: "Plage 64 – 122 bpm",

  graph: [
    72, 74, 73, 75, 78, 80, 82, 85, 90, 95, 100, 108, 115, 122, 118, 110, 102,
    95, 88, 82, 76, 73, 72, 74, 76, 79, 82, 86, 82, 78, 74, 72,
  ],
  graphMin: 60,
  graphMax: 130,
  timeTicks: ["00:00", "06:00", "12:00", "18:00", "24:00"],

  detections: [
    {
      time: "10:14",
      title: "Rythme cardiaque accéléré",
      detail: "122 bpm · 2 min",
      color: colors.alert,
    },
    {
      time: "14:32",
      title: "Pic lié au stress",
      detail: "108 bpm · 4 min",
      color: colors.warn,
    },
    {
      time: "16:18",
      title: "Pic d'activité",
      detail: "118 bpm · course",
      color: colors.health,
    },
  ] as HeartDetection[],
};
