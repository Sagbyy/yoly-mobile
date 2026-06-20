import { colors } from "@/shared/config/tokens";

import type { HealthMetric } from "./types";

// Static placeholder until wired to the health metrics API.
export const healthMetrics: HealthMetric[] = [
  {
    id: "heart-rate",
    label: "HEART RATE",
    color: colors.heart,
    icon: "pulse",
    value: "72",
    caption: "bpm · resting",
    spark: [5, 7, 4, 8, 6, 9, 5, 11, 7, 9, 6, 8],
  },
  {
    id: "steps",
    label: "STEPS",
    color: colors.health,
    icon: "steps",
    value: "8 412",
    caption: "84% of goal",
    progress: 0.84,
  },
  {
    id: "sleep",
    label: "LAST NIGHT",
    color: colors.sleep,
    icon: "moon",
    value: "7h 42m",
    caption: "Score 86 · Good",
  },
  {
    id: "stress",
    label: "STRESS",
    color: colors.stress,
    icon: "drop",
    value: "28",
    caption: "Calm · all day",
  },
];
