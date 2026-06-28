import type {
  HeartRateInsights,
  HeartRatePeakType,
  HeartRateSeries,
  HeartRateSummary,
} from "@/shared/api/health";
import { colors } from "@/shared/config/tokens";
import { formatTimeOfDay, sampleEvenly } from "@/shared/lib/health-format";

export interface HeartDetection {
  time: string;
  title: string;
  detail: string;
  color: string;
}

export interface HeartRateView {
  resting: number;
  avgNote: string;
  deltaText: string;
  rangeText: string;
  graph: number[];
  graphMin: number;
  graphMax: number;
  timeTicks: string[];
  detections: HeartDetection[];
}

export interface HeartRateData {
  summary: HeartRateSummary;
  series: HeartRateSeries;
  insights: HeartRateInsights;
}

const PEAK_LABEL: Record<HeartRatePeakType, string> = {
  SPORT: "Pic d'activité",
  STRESS: "Pic lié au stress",
  ABNORMAL_ACCELERATION: "Accélération anormale",
  UNKNOWN: "Pic détecté",
};

const PEAK_COLOR: Record<HeartRatePeakType, string> = {
  SPORT: colors.health,
  STRESS: colors.warn,
  ABNORMAL_ACCELERATION: colors.alert,
  UNKNOWN: colors.ink3,
};

export function mapHeartRate({
  summary,
  series,
  insights,
}: HeartRateData): HeartRateView {
  const points = series.points;
  const mins = points.map((point) => point.minBpm);
  const maxs = points.map((point) => point.maxBpm);

  return {
    resting: Math.round(summary.restingBpm),
    avgNote: `Moy ${Math.round(summary.avgBpm)} bpm`,
    deltaText: `Dernier ${Math.round(summary.latestBpm)} bpm`,
    rangeText: `Plage ${Math.round(summary.minBpm)} – ${Math.round(summary.maxBpm)} bpm`,
    graph: points.map((point) => point.avgBpm),
    graphMin: Math.floor(
      (mins.length ? Math.min(...mins) : summary.minBpm) - 4,
    ),
    graphMax: Math.ceil((maxs.length ? Math.max(...maxs) : summary.maxBpm) + 4),
    timeTicks: sampleEvenly(
      points.map((point) => point.label),
      5,
    ),
    detections: insights.peaks.map((peak) => ({
      time: formatTimeOfDay(peak.startAt, summary.tz),
      title: PEAK_LABEL[peak.type] ?? PEAK_LABEL.UNKNOWN,
      detail: peak.description?.trim()
        ? `${Math.round(peak.peakBpm)} bpm · ${peak.description}`
        : `${Math.round(peak.peakBpm)} bpm`,
      color: PEAK_COLOR[peak.type] ?? PEAK_COLOR.UNKNOWN,
    })),
  };
}
