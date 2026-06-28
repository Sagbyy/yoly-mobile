import type {
  HeartRateSeries,
  HeartRateSummary,
  SleepSummary,
  StepsSummary,
  StressLevel,
  StressSeries,
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

import type { HealthOverview } from "./types";

export interface HealthOverviewData {
  heartRate: { summary: HeartRateSummary; series: HeartRateSeries };
  stress: { summary: StressSummary; series: StressSeries };
  sleep: SleepSummary;
  steps: StepsSummary;
}

const STRESS_LABEL: Record<StressLevel, string> = {
  CALM: "Globalement calme",
  LOW: "Stress faible",
  MEDIUM: "Stress modéré",
  HIGH: "Stress élevé",
};

const STRESS_WORD: Record<StressLevel, string> = {
  CALM: "calme",
  LOW: "faible",
  MEDIUM: "modéré",
  HIGH: "élevé",
};

function sleepWord(score: number): string {
  if (score >= 85) return "Très bon";
  if (score >= 70) return "Bon";
  if (score >= 50) return "Moyen";
  return "Faible";
}

function scoreWord(score: number): string {
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Bon";
  if (score >= 50) return "Correct";
  return "Faible";
}

function headline(score: number): string {
  if (score >= 80) return "Tout va bien";
  if (score >= 60) return "Globalement stable";
  return "À surveiller";
}

export function mapHealthOverview({
  heartRate,
  stress,
  sleep,
  steps,
}: HealthOverviewData): HealthOverview {
  const stepsPct = clampPercent(steps.goalProgressPct);
  const components = [100 - stress.summary.avgScore, stepsPct];
  if (sleep.hasData) components.push(sleep.sleepScore);
  const score = Math.round(
    components.reduce((total, value) => total + value, 0) / components.length,
  );

  const notes = [
    sleep.hasData ? `Sommeil ${Math.round(sleep.sleepScore)}` : null,
    `Stress ${STRESS_WORD[stress.summary.dominantLevel] ?? "calme"}`,
    `${stepsPct}% des pas`,
  ].filter(Boolean);

  return {
    caption: "Aujourd'hui",
    headline: headline(score),
    score,
    scoreDelta: scoreWord(score),
    scoreNote: notes.join(" · "),
    rows: [
      {
        id: "heart-rate",
        route: routes.health.heartRate,
        color: colors.heart,
        soft: colors.alertSoft,
        icon: "pulse",
        label: "FRÉQUENCE CARDIAQUE",
        subtitle: "Moyenne du jour",
        value: String(Math.round(heartRate.summary.avgBpm)),
        unit: "bpm",
        detail: `Repos ${Math.round(heartRate.summary.restingBpm)} · Pic ${Math.round(heartRate.summary.maxBpm)}`,
        spark: sampleEvenly(
          heartRate.series.points.map((point) => point.avgBpm),
          18,
        ),
      },
      {
        id: "stress",
        route: routes.health.stress,
        color: colors.stress,
        soft: colors.stressSoft,
        icon: "drop",
        label: "STRESS",
        subtitle: STRESS_LABEL[stress.summary.dominantLevel] ?? STRESS_LABEL.CALM,
        value: String(Math.round(stress.summary.avgScore)),
        unit: "/100",
        detail: `${Math.round(stress.summary.calmMinutes)} min en zone calme`,
        spark: sampleEvenly(
          stress.series.points.map((point) => point.avgScore),
          16,
        ),
      },
      {
        id: "sleep",
        route: routes.health.sleep,
        color: colors.sleep,
        soft: colors.sleepSoft,
        icon: "moon",
        label: "SOMMEIL",
        subtitle: sleep.hasData
          ? `Nuit dernière · ${sleepWord(sleep.sleepScore)}`
          : "Pas de données",
        value: sleep.hasData ? formatHoursMinutes(sleep.totalSleepMinutes) : "—",
        detail: sleep.hasData
          ? `Score ${Math.round(sleep.sleepScore)} · Profond ${formatHoursMinutes(sleep.stages.deepMinutes)}`
          : "Aucune nuit enregistrée",
        ring: sleep.hasData ? Math.round(sleep.sleepScore) : undefined,
      },
      {
        id: "activity",
        route: routes.health.activity,
        color: colors.health,
        soft: colors.healthSoft,
        icon: "steps",
        label: "ACTIVITÉ",
        subtitle: "Pas aujourd'hui",
        value: formatThousands(steps.totalSteps),
        detail: `sur ${formatThousands(steps.goal)}`,
        progress: stepsPct / 100,
      },
    ],
  };
}
