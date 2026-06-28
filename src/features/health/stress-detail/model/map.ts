import type {
  StressInsights,
  StressLevel,
  StressSeries,
  StressSummary,
} from "@/shared/api/health";
import { colors } from "@/shared/config/tokens";
import { formatTimeOfDay, sampleEvenly } from "@/shared/lib/health-format";

export type StressInsightIcon = "drop" | "shield";

export interface StressInsightCard {
  icon: StressInsightIcon;
  color: string;
  title: string;
  meta?: string;
  text: string;
}

export interface StressLegendItem {
  label: string;
  color: string;
}

export interface StressView {
  level: number;
  levelLabel: string;
  levelWord: string;
  levelColor: string;
  note: string;
  curve: number[];
  curveTicks: string[];
  legend: StressLegendItem[];
  insights: StressInsightCard[];
}

export interface StressData {
  summary: StressSummary;
  series: StressSeries;
  insights: StressInsights;
}

const LEVEL: Record<StressLevel, { label: string; word: string; color: string }> = {
  CALM: { label: "Zone calme", word: "Calme", color: colors.health },
  LOW: { label: "Stress faible", word: "Faible", color: colors.health },
  MEDIUM: { label: "Stress modéré", word: "Modéré", color: colors.warn },
  HIGH: { label: "Stress élevé", word: "Élevé", color: colors.stress },
};

const LEGEND: StressLegendItem[] = [
  { label: "Calme", color: colors.health },
  { label: "Modéré", color: colors.warn },
  { label: "Élevé", color: colors.stress },
];

function durationMinutes(startAt: string, endAt: string): number {
  const start = new Date(startAt).getTime();
  const end = new Date(endAt).getTime();
  if (Number.isNaN(start) || Number.isNaN(end) || end < start) return 0;
  return Math.round((end - start) / 60000);
}

export function mapStress({ summary, series, insights }: StressData): StressView {
  const level = LEVEL[summary.dominantLevel] ?? LEVEL.CALM;
  const peaks = insights.peaks.map<StressInsightCard>((peak) => {
    const minutes = durationMinutes(peak.startAt, peak.endAt);
    return {
      icon: "drop",
      color: colors.stress,
      title: `Pic · ${formatTimeOfDay(peak.startAt, summary.tz)}`,
      meta: minutes > 0 ? `${minutes} min` : undefined,
      text: peak.description,
    };
  });

  const insightCards =
    peaks.length > 0
      ? peaks
      : [
          {
            icon: "shield" as const,
            color: colors.health,
            title: "Aucun pic détecté",
            text: "Stress globalement maîtrisé sur la période.",
          },
        ];

  return {
    level: Math.round(summary.avgScore),
    levelLabel: level.label,
    levelWord: level.word,
    levelColor: level.color,
    note:
      insights.summary?.trim() ||
      `${Math.round(summary.calmMinutes)} min en zone calme sur la période.`,
    curve: series.points.map((point) => point.avgScore),
    curveTicks: sampleEvenly(
      series.points.map((point) => point.label),
      5,
    ),
    legend: LEGEND,
    insights: insightCards,
  };
}
