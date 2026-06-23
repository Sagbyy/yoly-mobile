import type { Href } from "expo-router";

export type HealthMetricIcon = "pulse" | "drop" | "moon" | "steps";

export interface HealthMetricRow {
  id: string;
  route: Href;
  color: string;
  soft: string;
  icon: HealthMetricIcon;
  label: string;
  subtitle: string;
  value: string;
  unit?: string;
  detail: string;
  spark?: number[];
  ring?: number;
  progress?: number;
}

export interface HealthOverview {
  caption: string;
  headline: string;
  score: number;
  scoreDelta: string;
  scoreNote: string;
  rows: HealthMetricRow[];
}
