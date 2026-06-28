import { colors } from "@/shared/config/tokens";

import { mapSleep, type SleepData } from "../map";

const data: SleepData = {
  summary: {
    period: "day",
    tz: "UTC",
    date: "2026-06-27",
    hasData: true,
    totalSleepMinutes: 462,
    timeInBedMinutes: 480,
    sleepScore: 86,
    efficiencyPct: 96,
    bedtime: "22:18",
    wakeTime: "06:00",
    stages: {
      deepMinutes: 78,
      lightMinutes: 242,
      remMinutes: 110,
      awakeMinutes: 12,
    },
  },
  series: {
    period: "week",
    tz: "UTC",
    nights: [
      { date: "2026-06-24", hasData: true, totalSleepMinutes: 440, sleepScore: 78, stages: { deepMinutes: 0, lightMinutes: 0, remMinutes: 0, awakeMinutes: 0 } },
      { date: "2026-06-25", hasData: false, totalSleepMinutes: 0, sleepScore: 0, stages: { deepMinutes: 0, lightMinutes: 0, remMinutes: 0, awakeMinutes: 0 } },
      { date: "2026-06-26", hasData: true, totalSleepMinutes: 500, sleepScore: 90, stages: { deepMinutes: 0, lightMinutes: 0, remMinutes: 0, awakeMinutes: 0 } },
    ],
  },
  insights: {
    engine: "rules",
    period: "day",
    avgScore: 84,
    avgDurationMinutes: 460,
    notes: [],
  },
};

describe("mapSleep", () => {
  it("maps the summary to score, duration and range", () => {
    const view = mapSleep(data);
    expect(view.hasData).toBe(true);
    expect(view.score).toBe(86);
    expect(view.scoreLabel).toBe("Très bon · Efficacité 96%");
    expect(view.duration).toBe("7:42");
    expect(view.asleepRange).toBe("22:18 → 06:00");
    expect(view.awakenings).toBe("12 min éveillé");
  });

  it("builds proportional stage segments and breakdown", () => {
    const view = mapSleep(data);
    expect(view.segments).toEqual([
      { stage: 2, minutes: 242 },
      { stage: 3, minutes: 78 },
      { stage: 1, minutes: 110 },
      { stage: 0, minutes: 12 },
    ]);
    expect(view.breakdown).toEqual([
      { label: "Profond", value: "1h 18m", color: colors.navy },
      { label: "Léger", value: "4h 02m", color: colors.sleep },
      { label: "REM", value: "1h 50m", color: colors.stress },
      { label: "Éveil", value: "12m", color: colors.warn },
    ]);
  });

  it("keeps only nights with data and labels them in French", () => {
    const view = mapSleep(data);
    expect(view.recentNights).toEqual([
      { day: "Mer", score: 78 },
      { day: "Ven", score: 90 },
    ]);
  });
});
