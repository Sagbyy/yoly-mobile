import { colors } from "@/shared/config/tokens";
import { routes } from "@/shared/config/routes";

import type { HealthOverview } from "./types";

// Static placeholder until wired to the health API.
export const healthOverview: HealthOverview = {
  caption: "Maya · Aujourd'hui",
  headline: "Tout va bien",
  score: 87,
  scoreDelta: "+4 vs semaine",
  scoreNote: "Stress, sommeil et activité dans la zone saine.",
  rows: [
    {
      id: "heart-rate",
      route: routes.health.heartRate,
      color: colors.heart,
      soft: colors.alertSoft,
      icon: "pulse",
      label: "FRÉQUENCE CARDIAQUE",
      subtitle: "Moyenne du jour",
      value: "82",
      unit: "bpm",
      detail: "Repos 68 · Pic 122 à 10:14",
      spark: [5, 7, 4, 8, 6, 9, 5, 11, 7, 9, 15, 8, 6, 9, 7, 6, 8, 7],
    },
    {
      id: "stress",
      route: routes.health.stress,
      color: colors.stress,
      soft: colors.stressSoft,
      icon: "drop",
      label: "STRESS",
      subtitle: "Globalement calme",
      value: "32",
      unit: "/100",
      detail: "1 pic · 14:32 à l'école",
      spark: [3, 4, 3, 5, 8, 11, 9, 6, 4, 3, 4, 3, 5, 7, 4, 3],
    },
    {
      id: "sleep",
      route: routes.health.sleep,
      color: colors.sleep,
      soft: colors.sleepSoft,
      icon: "moon",
      label: "SOMMEIL",
      subtitle: "Nuit dernière · Bon",
      value: "7h 42m",
      detail: "Score 86 · Profond 1h 18m",
      ring: 86,
    },
    {
      id: "activity",
      route: routes.health.activity,
      color: colors.health,
      soft: colors.healthSoft,
      icon: "steps",
      label: "ACTIVITÉ",
      subtitle: "Pas aujourd'hui",
      value: "8 412",
      detail: "sur 10 000",
      progress: 0.84,
    },
  ],
};
