import {
  clampPercent,
  formatClock,
  formatHoursMinutes,
  formatKilometers,
  formatThousands,
  formatTimeOfDay,
  formatWeekday,
  sampleEvenly,
} from "../health-format";

const NNBSP = String.fromCharCode(0x202f);

describe("formatThousands", () => {
  it("inserts a narrow no-break space as the thousands separator", () => {
    expect(formatThousands(8412)).toBe(`8${NNBSP}412`);
    expect(formatThousands(72)).toBe("72");
    expect(formatThousands(1234567)).toBe(`1${NNBSP}234${NNBSP}567`);
  });
});

describe("formatHoursMinutes", () => {
  it("formats minutes as Xh YYm", () => {
    expect(formatHoursMinutes(462)).toBe("7h 42m");
    expect(formatHoursMinutes(84)).toBe("1h 24m");
  });

  it("omits the hour part below one hour", () => {
    expect(formatHoursMinutes(12)).toBe("12m");
  });
});

describe("formatClock", () => {
  it("formats minutes as H:MM", () => {
    expect(formatClock(462)).toBe("7:42");
    expect(formatClock(60)).toBe("1:00");
  });
});

describe("formatTimeOfDay", () => {
  it("normalises an existing clock string", () => {
    expect(formatTimeOfDay("22:18")).toBe("22:18");
    expect(formatTimeOfDay("6:05")).toBe("06:05");
  });

  it("formats an ISO datetime in the given timezone", () => {
    expect(formatTimeOfDay("2026-06-27T10:14:00.000Z", "UTC")).toBe("10:14");
  });

  it("returns the raw value when unparseable", () => {
    expect(formatTimeOfDay("not-a-date")).toBe("not-a-date");
  });
});

describe("formatWeekday", () => {
  it("returns the French short weekday", () => {
    expect(formatWeekday("2026-06-27")).toBe("Sam");
    expect(formatWeekday("2026-06-29")).toBe("Lun");
  });
});

describe("formatKilometers", () => {
  it("converts meters to kilometers with one decimal", () => {
    expect(formatKilometers(5800)).toBe("5.8");
  });
});

describe("clampPercent", () => {
  it("clamps to the 0-100 range and rounds", () => {
    expect(clampPercent(83.6)).toBe(84);
    expect(clampPercent(-5)).toBe(0);
    expect(clampPercent(140)).toBe(100);
  });
});

describe("sampleEvenly", () => {
  it("returns all items when below the requested count", () => {
    expect(sampleEvenly([1, 2, 3], 5)).toEqual([1, 2, 3]);
  });

  it("samples evenly spaced items including the endpoints", () => {
    expect(sampleEvenly([0, 1, 2, 3, 4, 5, 6, 7, 8], 5)).toEqual([
      0, 2, 4, 6, 8,
    ]);
  });
});
