import { colors } from "@/shared/config/tokens";

import { mapHeartRate, type HeartRateData } from "../map";

const data: HeartRateData = {
  summary: {
    period: "day",
    tz: "UTC",
    from: "2026-06-27T00:00:00.000Z",
    to: "2026-06-27T23:59:59.000Z",
    avgBpm: 81.4,
    minBpm: 64,
    maxBpm: 122,
    restingBpm: 71.6,
    latestBpm: 76.2,
    latestAt: "2026-06-27T22:00:00.000Z",
    sampleCount: 480,
  },
  series: {
    period: "day",
    tz: "UTC",
    granularity: "hour",
    points: [
      { label: "00:00", start: "x", avgBpm: 72, minBpm: 66, maxBpm: 80, sampleCount: 20 },
      { label: "06:00", start: "x", avgBpm: 78, minBpm: 70, maxBpm: 88, sampleCount: 20 },
      { label: "12:00", start: "x", avgBpm: 110, minBpm: 90, maxBpm: 122, sampleCount: 20 },
      { label: "18:00", start: "x", avgBpm: 82, minBpm: 74, maxBpm: 96, sampleCount: 20 },
    ],
  },
  insights: {
    engine: "rules",
    period: "day",
    summary: "Journée calme.",
    peaks: [
      {
        startAt: "2026-06-27T10:14:00.000Z",
        endAt: "2026-06-27T10:16:00.000Z",
        peakBpm: 122,
        avgBpm: 110,
        type: "SPORT",
        confidence: 0.9,
        description: "course",
      },
      {
        startAt: "2026-06-27T14:32:00.000Z",
        endAt: "2026-06-27T14:36:00.000Z",
        peakBpm: 108,
        avgBpm: 100,
        type: "STRESS",
        confidence: 0.6,
        description: "",
      },
    ],
  },
};

describe("mapHeartRate", () => {
  it("maps summary fields to the view model", () => {
    const view = mapHeartRate(data);
    expect(view.resting).toBe(72);
    expect(view.avgNote).toBe("Moy 81 bpm");
    expect(view.deltaText).toBe("Dernier 76 bpm");
    expect(view.rangeText).toBe("Plage 64 – 122 bpm");
  });

  it("builds the graph and ticks from the series", () => {
    const view = mapHeartRate(data);
    expect(view.graph).toEqual([72, 78, 110, 82]);
    expect(view.graphMin).toBe(62);
    expect(view.graphMax).toBe(126);
    expect(view.timeTicks).toEqual(["00:00", "06:00", "12:00", "18:00"]);
  });

  it("maps peaks to localized, colored detections", () => {
    const view = mapHeartRate(data);
    expect(view.detections).toEqual([
      {
        time: "10:14",
        title: "Pic d'activité",
        detail: "122 bpm · course",
        color: colors.health,
      },
      {
        time: "14:32",
        title: "Pic lié au stress",
        detail: "108 bpm",
        color: colors.warn,
      },
    ]);
  });
});
