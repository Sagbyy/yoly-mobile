import { formatRelativeTime } from "../relative-time";

const NOW = new Date("2026-06-28T12:00:00.000Z").getTime();

describe("formatRelativeTime", () => {
  it("returns 'à l'instant' for very recent timestamps", () => {
    expect(formatRelativeTime("2026-06-28T11:59:30.000Z", NOW)).toBe(
      "à l'instant",
    );
  });

  it("formats minutes", () => {
    expect(formatRelativeTime("2026-06-28T11:55:00.000Z", NOW)).toBe(
      "il y a 5 min",
    );
  });

  it("formats hours", () => {
    expect(formatRelativeTime("2026-06-28T09:00:00.000Z", NOW)).toBe(
      "il y a 3 h",
    );
  });

  it("formats days", () => {
    expect(formatRelativeTime("2026-06-25T12:00:00.000Z", NOW)).toBe(
      "il y a 3 j",
    );
  });

  it("returns an empty string for an unparseable value", () => {
    expect(formatRelativeTime("nope", NOW)).toBe("");
  });
});
