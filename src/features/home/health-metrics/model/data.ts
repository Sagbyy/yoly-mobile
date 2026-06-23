import { colors } from "@/shared/config/tokens";
import { routes } from "@/shared/config/routes";

import type { HealthMetric } from "./types";

export const healthMetrics: HealthMetric[] = [
  {
    id: "heart-rate",
    route: routes.health.heartRate,
    label: "FRÉQUENCE CARDIAQUE",
    color: colors.heart,
    icon: "pulse",
    value: "72",
    caption: "bpm · au repos",
    spark: [5, 7, 4, 8, 6, 9, 5, 11, 7, 9, 6, 8],
  },
  {
    id: "steps",
    route: routes.health.activity,
    label: "PAS",
    color: colors.health,
    icon: "steps",
    value: "8 412",
    caption: "84% de l'objectif",
    progress: 0.84,
  },
  {
    id: "sleep",
    route: routes.health.sleep,
    label: "NUIT DERNIÈRE",
    color: colors.sleep,
    icon: "moon",
    value: "7h 42m",
    caption: "Score 86 · Bon",
  },
  {
    id: "stress",
    route: routes.health.stress,
    label: "STRESS",
    color: colors.stress,
    icon: "drop",
    value: "28",
    caption: "Calme · toute la journée",
  },
];
