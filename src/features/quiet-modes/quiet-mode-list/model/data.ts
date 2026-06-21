import { colors } from "@/shared/config/tokens";

import type { ActiveQuietMode, QuietMode } from "./types";

// Static placeholder until wired to the watch settings API.
export const activeQuietMode: ActiveQuietMode = {
  name: "Mode école",
  summary: "Appels coupés · Alertes urgentes uniquement",
  time: "08:30 → 15:30",
  days: "Lun · Mar · Mer · Jeu · Ven",
};

export const quietModes: QuietMode[] = [
  {
    id: "sleep",
    name: "Sommeil",
    icon: "moon",
    color: colors.sleep,
    schedule: "Tous les soirs",
    time: "21:00 → 07:00",
    enabled: true,
  },
  {
    id: "sport",
    name: "Sport",
    icon: "steps",
    color: colors.health,
    schedule: "Mar, Jeu",
    time: "17:00 → 18:30",
    enabled: true,
  },
  {
    id: "cinema",
    name: "Cinéma",
    icon: "audio",
    color: colors.stress,
    schedule: "À la demande",
    time: "Suspendre toutes les alertes",
    enabled: false,
  },
  {
    id: "family",
    name: "Famille",
    icon: "shield",
    color: colors.warn,
    schedule: "Dimanche après-midi",
    time: "14:00 → 19:00",
    enabled: false,
  },
];
