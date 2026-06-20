export type AlertCategory = "safety" | "health";

export type AlertTone = "alert" | "stress" | "warn" | "accent" | "health" | "neutral";

export type AlertIcon = "drop" | "battery" | "pin" | "steps" | "signal";

/** A standard alert row in the feed. */
export interface Alert {
  id: string;
  tone: AlertTone;
  icon: AlertIcon;
  title: string;
  detail: string;
  /** Relative time, e.g. "il y a 14 min". */
  timeAgo: string;
  category: AlertCategory;
}

/** The highlighted critical alert shown as a banner at the top. */
export interface CriticalAlert {
  /** Pill tag, e.g. "Critique". */
  tag: string;
  timeAgo: string;
  headline: string;
  description: string;
  primaryAction: string;
  secondaryAction: string;
  category: AlertCategory;
}

/** Segmented filter values. */
export type AlertFilter = "all" | AlertCategory;
