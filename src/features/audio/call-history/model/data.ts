export type CallDirection = "outgoing" | "incoming" | "missed";

export interface CallEntry {
  id: string;
  direction: CallDirection;
  /** Duration, or empty for missed calls. */
  duration: string;
  time: string;
}

export interface CallSection {
  title: string;
  items: CallEntry[];
}

// Static placeholder until wired to the call API.
export const callHistory: CallSection[] = [
  {
    title: "Aujourd'hui",
    items: [
      { id: "c1", direction: "outgoing", duration: "1m 42s", time: "12:31" },
      { id: "c2", direction: "incoming", duration: "0m 58s", time: "08:05" },
      { id: "c3", direction: "missed", duration: "", time: "07:48" },
    ],
  },
  {
    title: "Hier",
    items: [
      { id: "c4", direction: "outgoing", duration: "2m 13s", time: "18:20" },
      { id: "c5", direction: "outgoing", duration: "0m 36s", time: "16:04" },
      { id: "c6", direction: "incoming", duration: "1m 09s", time: "12:35" },
    ],
  },
];

export const callHistoryMeta = {
  subtitle: "Montre de Maya",
  summary: "6 appels cette semaine",
};
