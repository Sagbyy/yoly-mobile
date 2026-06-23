export type AlertCategory = "safety" | "health";

export type AlertTone = "alert" | "stress" | "warn" | "accent" | "health" | "neutral";

export type AlertIcon = "drop" | "battery" | "pin" | "steps" | "signal";

export interface Alert {
  id: string;
  tone: AlertTone;
  icon: AlertIcon;
  title: string;
  detail: string;
  timeAgo: string;
  category: AlertCategory;
}

export interface CriticalAlert {
  tag: string;
  timeAgo: string;
  headline: string;
  description: string;
  primaryAction: string;
  secondaryAction: string;
  category: AlertCategory;
}

export type AlertFilter = "all" | AlertCategory;
