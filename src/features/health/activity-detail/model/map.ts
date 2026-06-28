import type {
  StepsInsights,
  StepsSeries,
  StepsSummary,
} from "@/shared/api/health";
import {
  clampPercent,
  formatHoursMinutes,
  formatKilometers,
  formatThousands,
  formatWeekday,
} from "@/shared/lib/health-format";

export interface ActivityStat {
  label: string;
  value: string;
  unit?: string;
  note: string;
}

export interface ActivityView {
  steps: string;
  goalNote: string;
  ringPct: number;
  week: number[];
  weekDays: string[];
  weekGoal: number;
  weekMax: number;
  weekAvg: string;
  stats: ActivityStat[];
}

export interface ActivityData {
  summary: StepsSummary;
  series: StepsSeries;
  insights: StepsInsights;
}

export function mapActivity({
  summary,
  series,
  insights,
}: ActivityData): ActivityView {
  const steps = series.points.map((point) => point.steps);
  const average = steps.length
    ? Math.round(steps.reduce((total, value) => total + value, 0) / steps.length)
    : 0;
  const peak = steps.length ? Math.max(...steps) : series.goal;

  return {
    steps: formatThousands(summary.totalSteps),
    goalNote: `${clampPercent(summary.goalProgressPct)}% de l'objectif de ${formatThousands(summary.goal)}`,
    ringPct: clampPercent(summary.goalProgressPct),
    week: steps,
    weekDays: series.points.map((point) => formatWeekday(point.start)),
    weekGoal: series.goal,
    weekMax: Math.ceil(Math.max(peak, series.goal) * 1.15),
    weekAvg: `Moy ${formatThousands(average)}`,
    stats: [
      {
        label: "Distance",
        value: formatKilometers(summary.distanceMeters),
        unit: "km",
        note: "parcourus",
      },
      {
        label: "Temps actif",
        value: formatHoursMinutes(summary.activeMinutes),
        note: "en mouvement",
      },
      {
        label: "Calories",
        value: formatThousands(summary.calories),
        note: "kcal actives",
      },
      {
        label: "Série",
        value: String(insights.currentStreak),
        unit: "jours",
        note: `record ${insights.bestStreak} j`,
      },
    ],
  };
}
