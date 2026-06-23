export type TimelineIcon = "pin" | "shield" | "drop" | "audio";

export interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  subtitle: string;
  color: string;
  icon: TimelineIcon;
}
