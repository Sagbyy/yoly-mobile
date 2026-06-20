import { colors } from "@/shared/config/tokens";

import type { TimelineEvent } from "./types";

// Static placeholder until wired to the activity API.
export const timelineEvents: TimelineEvent[] = [
  {
    id: "left-home",
    time: "08:24",
    title: "Left home",
    subtitle: "Departed Home",
    color: colors.accent,
    icon: "pin",
  },
  {
    id: "arrived-school",
    time: "08:41",
    title: "Arrived at school",
    subtitle: "École Jules Ferry · 720m",
    color: colors.health,
    icon: "shield",
  },
  {
    id: "stress-peak",
    time: "10:12",
    title: "Stress peak",
    subtitle: "Detected · 4 min",
    color: colors.stress,
    icon: "drop",
  },
  {
    id: "audio-recorded",
    time: "12:30",
    title: "Audio recorded",
    subtitle: "1m 14s · school",
    color: colors.ink,
    icon: "audio",
  },
];
