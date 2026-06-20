export type MetricIcon = "pulse" | "steps" | "moon" | "drop";

export interface HealthMetric {
  id: string;
  /** Uppercase micro label, e.g. "HEART RATE". */
  label: string;
  /** Accent color (hex) for the label, icon and chart. */
  color: string;
  icon: MetricIcon;
  /** Primary value, e.g. "72" or "7h 42m". */
  value: string;
  /** Secondary line under the value. */
  caption?: string;
  /** Optional sparkline series. */
  spark?: number[];
  /** Optional progress fraction (0–1) rendered as a bar. */
  progress?: number;
}
