import type {
  SleepInsights,
  SleepSeries,
  SleepStages,
  SleepSummary,
} from "@/shared/api/health";
import { colors } from "@/shared/config/tokens";
import {
  formatClock,
  formatHoursMinutes,
  formatTimeOfDay,
  formatWeekday,
} from "@/shared/lib/health-format";
import type { SleepSegment } from "@/shared/ui/charts";

export interface SleepStageBreakdown {
  label: string;
  value: string;
  color: string;
}

export interface RecentNight {
  day: string;
  score: number;
}

export interface SleepView {
  hasData: boolean;
  score: number;
  scoreLabel: string;
  duration: string;
  asleepRange: string;
  awakenings: string;
  segments: SleepSegment[];
  stageTicks: string[];
  breakdown: SleepStageBreakdown[];
  recentNights: RecentNight[];
}

export interface SleepData {
  summary: SleepSummary;
  series: SleepSeries;
  insights: SleepInsights;
}

function qualityWord(score: number): string {
  if (score >= 85) return "Très bon";
  if (score >= 70) return "Bon";
  if (score >= 50) return "Moyen";
  return "Faible";
}

function buildSegments(stages: SleepStages): SleepSegment[] {
  return [
    { stage: 2, minutes: stages.lightMinutes },
    { stage: 3, minutes: stages.deepMinutes },
    { stage: 1, minutes: stages.remMinutes },
    { stage: 0, minutes: stages.awakeMinutes },
  ].filter((segment) => segment.minutes > 0) as SleepSegment[];
}

export function mapSleep({ summary, series }: SleepData): SleepView {
  const bedtime = formatTimeOfDay(summary.bedtime, summary.tz);
  const wakeTime = formatTimeOfDay(summary.wakeTime, summary.tz);
  const { stages } = summary;

  return {
    hasData: summary.hasData,
    score: Math.round(summary.sleepScore),
    scoreLabel: `${qualityWord(summary.sleepScore)} · Efficacité ${Math.round(summary.efficiencyPct)}%`,
    duration: formatClock(summary.totalSleepMinutes),
    asleepRange: `${bedtime} → ${wakeTime}`,
    awakenings: `${Math.round(stages.awakeMinutes)} min éveillé`,
    segments: buildSegments(stages),
    stageTicks: [bedtime, wakeTime],
    breakdown: [
      { label: "Profond", value: formatHoursMinutes(stages.deepMinutes), color: colors.navy },
      { label: "Léger", value: formatHoursMinutes(stages.lightMinutes), color: colors.sleep },
      { label: "REM", value: formatHoursMinutes(stages.remMinutes), color: colors.stress },
      { label: "Éveil", value: formatHoursMinutes(stages.awakeMinutes), color: colors.warn },
    ],
    recentNights: series.nights
      .filter((night) => night.hasData)
      .slice(-7)
      .map((night) => ({
        day: formatWeekday(night.date),
        score: Math.round(night.sleepScore),
      })),
  };
}
