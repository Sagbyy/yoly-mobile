import { colors } from "@/shared/config/tokens";

export interface Recording {
  id: string;
  time: string;
  place: string;
  duration: string;
  color: string;
  tag: string;
  location: string;
}

export interface RecordingSection {
  title: string;
  items: Recording[];
}

export const recordingSections: RecordingSection[] = [
  {
    title: "Aujourd'hui",
    items: [
      {
        id: "r1",
        time: "12:30",
        place: "Cour de récré",
        duration: "1m 14s",
        color: colors.accent,
        tag: "École",
        location: "École Jules Ferry",
      },
      {
        id: "r2",
        time: "10:14",
        place: "Pause en classe",
        duration: "0m 42s",
        color: colors.ink,
        tag: "École",
        location: "École Jules Ferry",
      },
      {
        id: "r3",
        time: "08:36",
        place: "Sur le trajet",
        duration: "2m 06s",
        color: colors.health,
        tag: "Trajet",
        location: "Rue Berthelot",
      },
    ],
  },
  {
    title: "Hier",
    items: [
      {
        id: "r4",
        time: "18:14",
        place: "Arrivée maison",
        duration: "0m 36s",
        color: colors.ink,
        tag: "Maison",
        location: "12 rue Berthelot",
      },
      {
        id: "r5",
        time: "16:02",
        place: "Sortie d'école",
        duration: "1m 02s",
        color: colors.ink,
        tag: "École",
        location: "École Jules Ferry",
      },
    ],
  },
];

export const recordingsMeta = {
  subtitle: "Depuis la montre de Maya",
  summary: "14 enregistrements · 38 min au total",
};

export const allRecordings: Recording[] = recordingSections.flatMap((s) => s.items);

export function findRecording(id?: string): Recording {
  return allRecordings.find((r) => r.id === id) ?? allRecordings[0];
}
