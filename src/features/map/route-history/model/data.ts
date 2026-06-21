import { colors } from "@/shared/config/tokens";

export interface RouteTrip {
  id: string;
  date: string;
  title: string;
  time: string;
  duration: string;
  color: string;
}

// Static placeholder until wired to the route history API.
export const routeSummary = {
  stats: [
    { label: "Trajets", value: "12" },
    { label: "Distance", value: "18,4 km" },
    { label: "Temps moy", value: "23 min" },
  ],
  weekBars: [40, 90, 30, 110, 70, 50, 25],
  weekHighlight: 3,
  weekLabels: ["L", "M", "M", "J", "V", "S", "D"],
};

export const routeTrips: RouteTrip[] = [
  {
    id: "t1",
    date: "Mar 12 mai",
    title: "Maison → École",
    time: "08:24 → 08:41",
    duration: "17 min · 1,2 km",
    color: colors.accent,
  },
  {
    id: "t2",
    date: "Mar 12 mai",
    title: "École → Sport",
    time: "16:05 → 16:24",
    duration: "19 min · 1,6 km",
    color: colors.stress,
  },
  {
    id: "t3",
    date: "Lun 11 mai",
    title: "Maison → École",
    time: "08:18 → 08:39",
    duration: "21 min · 1,2 km",
    color: colors.accent,
  },
  {
    id: "t4",
    date: "Lun 11 mai",
    title: "École → Maison",
    time: "16:40 → 16:58",
    duration: "18 min · 1,2 km",
    color: colors.health,
  },
];
