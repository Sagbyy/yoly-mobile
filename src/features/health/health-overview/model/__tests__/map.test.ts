import { formatThousands } from "@/shared/lib/health-format";

import { mapHealthOverview, type HealthOverviewData } from "../map";

const data: HealthOverviewData = {
  heartRate: {
    summary: {
      period: "day",
      tz: "UTC",
      from: "x",
      to: "x",
      avgBpm: 82,
      minBpm: 64,
      maxBpm: 122,
      restingBpm: 68,
      latestBpm: 76,
      latestAt: "x",
      sampleCount: 1,
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
  stress: {
    summary: {
      period: "day",
      tz: "UTC",
      from: "x",
      to: "x",
      avgScore: 32,
      maxScore: 85,
      dominantLevel: "CALM",
      calmMinutes: 540,
      sampleCount: 1,
    },
    series: {
      period: "day",
      tz: "UTC",
      granularity: "hour",
      points: [{ label: "00:00", start: "x", avgScore: 22, level: "CALM" }],
    },
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
  steps: {
    period: "day",
    tz: "UTC",
    from: "x",
    to: "x",
    totalSteps: 8412,
    goal: 10000,
    goalProgressPct: 84,
    activeMinutes: 84,
    calories: 312,
    distanceMeters: 5800,
  },
};

describe("mapHealthOverview", () => {
  it("computes a composite score and headline", () => {
    const view = mapHealthOverview(data);
    expect(view.score).toBe(79);
    expect(view.headline).toBe("Globalement stable");
    expect(view.scoreDelta).toBe("Bon");
    expect(view.scoreNote).toBe("Sommeil 86 · Stress calme · 84% des pas");
  });

  it("builds the four metric rows", () => {
    const view = mapHealthOverview(data);
    expect(view.rows.map((row) => row.id)).toEqual([
      "heart-rate",
      "stress",
      "sleep",
      "activity",
    ]);
    const sleep = view.rows.find((row) => row.id === "sleep");
    expect(sleep?.value).toBe("7h 42m");
    expect(sleep?.ring).toBe(86);
    const activity = view.rows.find((row) => row.id === "activity");
    expect(activity?.detail).toBe(`sur ${formatThousands(10000)}`);
    expect(activity?.progress).toBeCloseTo(0.84);
  });

  it("excludes sleep from the score when there is no data", () => {
    const view = mapHealthOverview({
      ...data,
      sleep: { ...data.sleep, hasData: false },
    });
    expect(view.score).toBe(76);
    const sleep = view.rows.find((row) => row.id === "sleep");
    expect(sleep?.value).toBe("—");
    expect(sleep?.ring).toBeUndefined();
  });
});
