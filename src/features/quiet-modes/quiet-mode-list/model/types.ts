export type QuietModeIcon = "moon" | "steps" | "audio" | "shield";

export interface QuietMode {
  id: string;
  name: string;
  icon: QuietModeIcon;
  color: string;
  schedule: string;
  time: string;
  enabled: boolean;
}

export interface ActiveQuietMode {
  name: string;
  summary: string;
  time: string;
  days: string;
}
