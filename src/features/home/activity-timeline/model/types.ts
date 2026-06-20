export type TimelineIcon = "pin" | "shield" | "drop" | "audio";

export interface TimelineEvent {
  id: string;
  /** Time of the event, e.g. "08:24". */
  time: string;
  title: string;
  subtitle: string;
  /** Accent color (hex) for the icon chip glyph. */
  color: string;
  icon: TimelineIcon;
}
