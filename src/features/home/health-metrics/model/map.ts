import type {
  HeartRateSeries,
  HeartRateSummary,
  SleepSummary,
  StepsSummary,
  StressLevel,
  StressSummary,
} from "@/shared/api/health";
import { colors } from "@/shared/config/tokens";
import { routes } from "@/shared/config/routes";
import {
  clampPercent,
  formatHoursMinutes,
  formatThousands,
  sampleEvenly,
} from "@/shared/lib/health-format";

import type { HealthMetric } from "./types";

export interface HealthMetricsData {
  heartRate: { summary: HeartRateSummary; series: HeartRateSeries };
  steps: StepsSummary;
  sleep: SleepSummary;
  stress: StressSummary;
}

const STRESS_WORD: Record<StressLevel, string> = {
  CALM: "Calme",
  LOW: "Faible",
  MEDIUM: "Modéré",
  HIGH: "Élevé",
};

function sleepWord(score: number): string {
  if (score >= 85) return "Très bon";
  if (score >= 70) return "Bon";
  if (score >= 50) return "Moyen";
  return "Faible";
}

export function mapHealthMetrics({
  heartRate,
  steps,
  sleep,
  stress,
}: HealthMetricsData): HealthMetric[] {
  const stepsPct = clampPercent(steps.goalProgressPct);

  return [
    {
      id: "heart-rate",
      route: routes.health.heartRate,
      label: "FRÉQUENCE CARDIAQUE",
      color: colors.heart,
      icon: "pulse",
      value: String(Math.round(heartRate.summary.restingBpm)),
      caption: "bpm · au repos",
      spark: sampleEvenly(
        heartRate.series.points.map((point) => point.avgBpm),
        12,
      ),
    },
    {
      id: "steps",
      route: routes.health.activity,
      label: "PAS",
      color: colors.health,
      icon: "steps",
      value: formatThousands(steps.totalSteps),
      caption: `${stepsPct}% de l'objectif`,
      progress: stepsPct / 100,
    },
    {
      id: "sleep",
      route: routes.health.sleep,
      label: "NUIT DERNIÈRE",
      color: colors.sleep,
      icon: "moon",
      value: sleep.hasData ? formatHoursMinutes(sleep.totalSleepMinutes) : "—",
      caption: sleep.hasData
        ? `Score ${Math.round(sleep.sleepScore)} · ${sleepWord(sleep.sleepScore)}`
        : "Pas de données",
    },
    {
      id: "stress",
      route: routes.health.stress,
      label: "STRESS",
      color: colors.stress,
      icon: "drop",
      value: String(Math.round(stress.avgScore)),
      caption: STRESS_WORD[stress.dominantLevel] ?? STRESS_WORD.CALM,
    },
  ];
}
