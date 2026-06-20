import type { Href } from "expo-router";

export type HealthMetricIcon = "pulse" | "drop" | "moon" | "steps";

export interface HealthMetricRow {
  id: string;
  /** Detail screen this row links to. */
  route: Href;
  /** Glyph/label color (hex). */
  color: string;
  /** Soft chip background (hex). */
  soft: string;
  icon: HealthMetricIcon;
  /** Uppercase micro label, e.g. "FRÉQUENCE CARDIAQUE". */
  label: string;
  /** Short status line under the label. */
  subtitle: string;
  /** Primary value, e.g. "82" or "7h 42m". */
  value: string;
  /** Optional unit suffix, e.g. "bpm" or "/100". */
  unit?: string;
  /** Secondary detail line. */
  detail: string;
  /** Optional sparkline series (heart / stress). */
  spark?: number[];
  /** Optional ring percentage (sleep). */
  ring?: number;
  /** Optional progress fraction 0–1 (activity). */
  progress?: number;
}

export interface HealthOverview {
  /** Header subtitle, e.g. "Maya · Aujourd'hui". */
  caption: string;
  /** Header headline, e.g. "Tout va bien". */
  headline: string;
  /** Global day score 0–100. */
  score: number;
  /** Score delta pill, e.g. "+4 vs semaine". */
  scoreDelta: string;
  /** Score explanation. */
  scoreNote: string;
  rows: HealthMetricRow[];
}
