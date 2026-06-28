import { mapActivity, type ActivityData } from "../map";

const ascii = (value: string) => value.replace(/\s/g, " ");

const data: ActivityData = {
  summary: {
    period: "day",
    tz: "UTC",
    from: "2026-06-27T00:00:00.000Z",
    to: "2026-06-27T23:59:59.000Z",
    totalSteps: 8412,
    goal: 10000,
    goalProgressPct: 84.1,
    activeMinutes: 84,
    calories: 312,
    distanceMeters: 5800,
  },
  series: {
    period: "week",
    tz: "UTC",
    granularity: "day",
    goal: 10000,
    points: [
      { label: "Lun", start: "2026-06-22T00:00:00.000Z", steps: 6200, cumulativeSteps: 6200 },
      { label: "Mar", start: "2026-06-23T00:00:00.000Z", steps: 7800, cumulativeSteps: 14000 },
      { label: "Mer", start: "2026-06-24T00:00:00.000Z", steps: 11400, cumulativeSteps: 25400 },
    ],
  },
  insights: {
    engine: "rules",
    period: "week",
    goal: 10000,
    currentStreak: 5,
    bestStreak: 9,
    goalMetDays: 4,
    totalDays: 7,
    summary: "Bonne semaine.",
  },
};

describe("mapActivity", () => {
  it("maps the daily summary to the headline", () => {
    const view = mapActivity(data);
    expect(ascii(view.steps)).toBe("8 412");
    expect(ascii(view.goalNote)).toBe("84% de l'objectif de 10 000");
    expect(view.ringPct).toBe(84);
  });

  it("maps the weekly series to the chart inputs", () => {
    const view = mapActivity(data);
    expect(view.week).toEqual([6200, 7800, 11400]);
    expect(view.weekDays).toEqual(["Lun", "Mar", "Mer"]);
    expect(view.weekGoal).toBe(10000);
    expect(view.weekMax).toBe(Math.ceil(11400 * 1.15));
    expect(ascii(view.weekAvg)).toBe("Moy 8 467");
  });

  it("derives the stat cards from the summary and insights", () => {
    const view = mapActivity(data);
    expect(view.stats).toEqual([
      { label: "Distance", value: "5.8", unit: "km", note: "parcourus" },
      { label: "Temps actif", value: "1h 24m", note: "en mouvement" },
      { label: "Calories", value: "312", note: "kcal actives" },
      { label: "Série", value: "5", unit: "jours", note: "record 9 j" },
    ]);
  });
});
