import type { Href } from "expo-router";

export type MetricIcon = "pulse" | "steps" | "moon" | "drop";

export interface HealthMetric {
  id: string;
  route: Href;
  label: string;
  color: string;
  icon: MetricIcon;
  value: string;
  caption?: string;
  spark?: number[];
  progress?: number;
}
