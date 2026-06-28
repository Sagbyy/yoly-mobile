import { colors } from "@/shared/config/tokens";

import { mapStress, type StressData } from "../map";

const base: StressData = {
  summary: {
    period: "day",
    tz: "UTC",
    from: "2026-06-27T00:00:00.000Z",
    to: "2026-06-27T23:59:59.000Z",
    avgScore: 31.6,
    maxScore: 85,
    dominantLevel: "CALM",
    calmMinutes: 540,
    sampleCount: 96,
  },
  series: {
    period: "day",
    tz: "UTC",
    granularity: "hour",
    points: [
      { label: "00:00", start: "x", avgScore: 22, level: "CALM" },
      { label: "12:00", start: "x", avgScore: 78, level: "HIGH" },
      { label: "23:00", start: "x", avgScore: 28, level: "CALM" },
    ],
  },
  insights: {
    engine: "rules",
    period: "day",
    summary: "Globalement calme.",
    peaks: [
      {
        startAt: "2026-06-27T14:32:00.000Z",
        endAt: "2026-06-27T14:36:00.000Z",
        peakScore: 85,
        description: "Détecté à l'école.",
      },
    ],
  },
};

describe("mapStress", () => {
  it("maps the dominant level to a French label, word and color", () => {
    const view = mapStress(base);
    expect(view.level).toBe(32);
    expect(view.levelLabel).toBe("Zone calme");
    expect(view.levelWord).toBe("Calme");
    expect(view.levelColor).toBe(colors.health);
    expect(view.note).toBe("Globalement calme.");
  });

  it("maps peaks to drop cards with a duration", () => {
    const view = mapStress(base);
    expect(view.insights).toEqual([
      {
        icon: "drop",
        color: colors.stress,
        title: "Pic · 14:32",
        meta: "4 min",
        text: "Détecté à l'école.",
      },
    ]);
  });

  it("falls back to a shield card when there are no peaks", () => {
    const view = mapStress({
      ...base,
      insights: { ...base.insights, peaks: [] },
    });
    expect(view.insights[0].icon).toBe("shield");
    expect(view.curve).toEqual([22, 78, 28]);
  });
});
