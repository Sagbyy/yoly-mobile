import { api } from "./client";

export type HealthPeriod = "day" | "week" | "month";

export type Granularity = "hour" | "day";

export type StressLevel = "CALM" | "LOW" | "MEDIUM" | "HIGH";

export type HeartRatePeakType =
  | "SPORT"
  | "STRESS"
  | "ABNORMAL_ACCELERATION"
  | "UNKNOWN";

export interface HealthQuery {
  period?: HealthPeriod;
  date?: string;
  tz?: string;
}

export interface HeartRateSummary {
  period: HealthPeriod;
  tz: string;
  from: string;
  to: string;
  avgBpm: number;
  minBpm: number;
  maxBpm: number;
  restingBpm: number;
  latestBpm: number;
  latestAt: string;
  sampleCount: number;
}

export interface HeartRateSeriesPoint {
  label: string;
  start: string;
  avgBpm: number;
  minBpm: number;
  maxBpm: number;
  sampleCount: number;
}

export interface HeartRateSeries {
  period: HealthPeriod;
  tz: string;
  granularity: Granularity;
  points: HeartRateSeriesPoint[];
}

export interface HeartRatePeak {
  startAt: string;
  endAt: string;
  peakBpm: number;
  avgBpm: number;
  type: HeartRatePeakType;
  confidence: number;
  description: string;
}

export interface HeartRateInsights {
  engine: string;
  period: HealthPeriod;
  peaks: HeartRatePeak[];
  summary: string;
}

export interface StressSummary {
  period: HealthPeriod;
  tz: string;
  from: string;
  to: string;
  avgScore: number;
  maxScore: number;
  dominantLevel: StressLevel;
  calmMinutes: number;
  sampleCount: number;
}

export interface StressSeriesPoint {
  label: string;
  start: string;
  avgScore: number;
  level: StressLevel;
}

export interface StressSeries {
  period: HealthPeriod;
  tz: string;
  granularity: Granularity;
  points: StressSeriesPoint[];
}

export interface StressPeak {
  startAt: string;
  endAt: string;
  peakScore: number;
  description: string;
}

export interface StressInsights {
  engine: string;
  period: HealthPeriod;
  peaks: StressPeak[];
  summary: string;
}

export interface SleepStages {
  deepMinutes: number;
  lightMinutes: number;
  remMinutes: number;
  awakeMinutes: number;
}

export interface SleepSummary {
  period: HealthPeriod;
  tz: string;
  date: string;
  hasData: boolean;
  totalSleepMinutes: number;
  timeInBedMinutes: number;
  sleepScore: number;
  efficiencyPct: number;
  bedtime: string;
  wakeTime: string;
  stages: SleepStages;
}

export interface SleepNight {
  date: string;
  hasData: boolean;
  totalSleepMinutes: number;
  sleepScore: number;
  stages: SleepStages;
}

export interface SleepSeries {
  period: HealthPeriod;
  tz: string;
  nights: SleepNight[];
}

export interface SleepInsights {
  engine: string;
  period: HealthPeriod;
  avgScore: number;
  avgDurationMinutes: number;
  notes: string[];
}

export interface StepsSummary {
  period: HealthPeriod;
  tz: string;
  from: string;
  to: string;
  totalSteps: number;
  goal: number;
  goalProgressPct: number;
  activeMinutes: number;
  calories: number;
  distanceMeters: number;
}

export interface StepsSeriesPoint {
  label: string;
  start: string;
  steps: number;
  cumulativeSteps: number;
}

export interface StepsSeries {
  period: HealthPeriod;
  tz: string;
  granularity: Granularity;
  goal: number;
  points: StepsSeriesPoint[];
}

export interface StepsInsights {
  engine: string;
  period: HealthPeriod;
  goal: number;
  currentStreak: number;
  bestStreak: number;
  goalMetDays: number;
  totalDays: number;
  summary: string;
}

export function getTimeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "Europe/Paris";
  } catch {
    return "Europe/Paris";
  }
}

export function buildHealthQuery(query: HealthQuery = {}): string {
  const entries = Object.entries(query).filter(
    ([, value]) => value !== undefined && value !== null && value !== "",
  );
  if (entries.length === 0) return "";
  return (
    "?" +
    entries
      .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
      .join("&")
  );
}

const path = (metric: string, resource: string, query: HealthQuery) =>
  `/health/${metric}/${resource}${buildHealthQuery(query)}`;

export function getHeartRateSummary(query?: HealthQuery) {
  return api.get<HeartRateSummary>(path("heart-rate", "summary", query ?? {}));
}

export function getHeartRateSeries(query?: HealthQuery) {
  return api.get<HeartRateSeries>(path("heart-rate", "series", query ?? {}));
}

export function getHeartRateInsights(query?: HealthQuery) {
  return api.get<HeartRateInsights>(
    path("heart-rate", "insights", query ?? {}),
  );
}

export function getStressSummary(query?: HealthQuery) {
  return api.get<StressSummary>(path("stress", "summary", query ?? {}));
}

export function getStressSeries(query?: HealthQuery) {
  return api.get<StressSeries>(path("stress", "series", query ?? {}));
}

export function getStressInsights(query?: HealthQuery) {
  return api.get<StressInsights>(path("stress", "insights", query ?? {}));
}

export function getSleepSummary(query?: HealthQuery) {
  return api.get<SleepSummary>(path("sleep", "summary", query ?? {}));
}

export function getSleepSeries(query?: HealthQuery) {
  return api.get<SleepSeries>(path("sleep", "series", query ?? {}));
}

export function getSleepInsights(query?: HealthQuery) {
  return api.get<SleepInsights>(path("sleep", "insights", query ?? {}));
}

export function getStepsSummary(query?: HealthQuery) {
  return api.get<StepsSummary>(path("steps", "summary", query ?? {}));
}

export function getStepsSeries(query?: HealthQuery) {
  return api.get<StepsSeries>(path("steps", "series", query ?? {}));
}

export function getStepsInsights(query?: HealthQuery) {
  return api.get<StepsInsights>(path("steps", "insights", query ?? {}));
}
