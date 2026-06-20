export interface ActivityStat {
  label: string;
  value: string;
  unit?: string;
  note: string;
}

export const activityDetail = {
  steps: "8 412",
  goalNote: "84% de l'objectif de 10 000",
  ringPct: 84,

  week: [6200, 7800, 4500, 9200, 11400, 8800, 7200],
  weekDays: ["L", "M", "M", "J", "V", "S", "D"],
  weekGoal: 10000,
  weekMax: 12000,
  weekAvg: "Moy 7 884",

  stats: [
    { label: "Distance", value: "5.8", unit: "km", note: "vs 4.9 km moy" },
    { label: "Temps actif", value: "1h 24m", note: "2 phases d'activité" },
    { label: "Calories", value: "312", note: "kcal actives" },
    { label: "Série", value: "5", unit: "jours", note: "objectif d'affilée" },
  ] as ActivityStat[],
};
