export type QuietModeIcon = "moon" | "steps" | "audio" | "shield";

export interface QuietMode {
  id: string;
  name: string;
  /** Glyph icon. */
  icon: QuietModeIcon;
  /** Chip background color (hex). */
  color: string;
  /** Schedule summary, e.g. "Tous les soirs". */
  schedule: string;
  /** Time summary, e.g. "21:00 → 07:00". */
  time: string;
  enabled: boolean;
}

export interface ActiveQuietMode {
  name: string;
  /** Status summary, e.g. "Appels coupés · Alertes urgentes uniquement". */
  summary: string;
  time: string;
  days: string;
}
