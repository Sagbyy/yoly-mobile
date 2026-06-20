import { colors } from "@/shared/config/tokens";
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

export const sleepDetail = {
  score: 86,
  scoreLabel: "Bon · +6 cette semaine",
  duration: "7:42",
  asleepRange: "22:18 → 06:00",
  awakenings: "1 réveil",

  segments: [
    { stage: 2, minutes: 25 },
    { stage: 3, minutes: 40 },
    { stage: 2, minutes: 30 },
    { stage: 1, minutes: 25 },
    { stage: 2, minutes: 35 },
    { stage: 3, minutes: 30 },
    { stage: 1, minutes: 20 },
    { stage: 2, minutes: 25 },
    { stage: 0, minutes: 10 },
    { stage: 2, minutes: 40 },
    { stage: 1, minutes: 30 },
    { stage: 2, minutes: 20 },
    { stage: 3, minutes: 20 },
  ] as SleepSegment[],
  stageTicks: ["22:18", "00:00", "02:00", "04:00", "06:00"],

  breakdown: [
    { label: "Profond", value: "1h 18m", color: colors.navy },
    { label: "Léger", value: "4h 02m", color: colors.sleep },
    { label: "REM", value: "1h 50m", color: colors.stress },
    { label: "Éveil", value: "0h 12m", color: colors.warn },
  ] as SleepStageBreakdown[],

  recentNights: [
    { day: "Mer", score: 78 },
    { day: "Jeu", score: 72 },
    { day: "Ven", score: 88 },
    { day: "Sam", score: 90 },
    { day: "Dim", score: 82 },
    { day: "Lun", score: 86 },
    { day: "Mar", score: 85 },
  ] as RecentNight[],
};
