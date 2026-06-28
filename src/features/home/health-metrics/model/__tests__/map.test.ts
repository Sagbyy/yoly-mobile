import { colors } from "@/shared/config/tokens";

import { mapHealthMetrics, type HealthMetricsData } from "../map";

const ascii = (value: string) => value.replace(/\s/g, " ");

const data: HealthMetricsData = {
  heartRate: {
    summary: {
      period: "day",
      tz: "UTC",
      from: "x",
      to: "x",
      avgBpm: 81,
      minBpm: 64,
      maxBpm: 122,
      restingBpm: 72,
      latestBpm: 76,
      latestAt: "x",
      sampleCount: 480,
    },
    series: {
      period: "day",
      tz: "UTC",
      granularity: "hour",
      points: [
        { label: "00:00", start: "x", avgBpm: 72, minBpm: 66, maxBpm: 80, sampleCount: 1 },
        { label: "12:00", start: "x", avgBpm: 110, minBpm: 90, maxBpm: 122, sampleCount: 1 },
      ],
    },
  },
  steps: {
    period: "day",
    tz: "UTC",
    from: "x",
    to: "x",
    totalSteps: 8412,
    goal: 10000,
    goalProgressPct: 84.1,
    activeMinutes: 84,
    calories: 312,
    distanceMeters: 5800,
  },
  sleep: {
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
    stages: { deepMinutes: 78, lightMinutes: 242, remMinutes: 110, awakeMinutes: 12 },
  },
  stress: {
    period: "day",
    tz: "UTC",
    from: "x",
    to: "x",
    avgScore: 28,
    maxScore: 85,
    dominantLevel: "CALM",
    calmMinutes: 540,
    sampleCount: 96,
  },
};

describe("mapHealthMetrics", () => {
  it("produces the four home metric cards from the summaries", () => {
    const metrics = mapHealthMetrics(data);
    expect(metrics.map((metric) => metric.id)).toEqual([
      "heart-rate",
      "steps",
      "sleep",
      "stress",
    ]);

    const [heart, steps, sleep, stress] = metrics;
    expect(heart.value).toBe("72");
    expect(heart.color).toBe(colors.heart);
    expect(heart.spark).toEqual([72, 110]);

    expect(ascii(steps.value)).toBe("8 412");
    expect(steps.caption).toBe("84% de l'objectif");
    expect(steps.progress).toBeCloseTo(0.84);

    expect(sleep.value).toBe("7h 42m");
    expect(sleep.caption).toBe("Score 86 · Très bon");

    expect(stress.value).toBe("28");
    expect(stress.caption).toBe("Calme");
  });

  it("shows an empty sleep card when there is no data", () => {
    const metrics = mapHealthMetrics({
      ...data,
      sleep: { ...data.sleep, hasData: false },
    });
    const sleep = metrics.find((metric) => metric.id === "sleep");
    expect(sleep?.value).toBe("—");
    expect(sleep?.caption).toBe("Pas de données");
  });
});
