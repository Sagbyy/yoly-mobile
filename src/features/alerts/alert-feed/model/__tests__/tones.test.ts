import { TONE_STYLES } from "../tones";
import type { AlertTone } from "../types";

describe("TONE_STYLES", () => {
  const tones: AlertTone[] = ["alert", "stress", "warn", "accent", "health", "neutral"];

  it("defines a color and soft background for every tone", () => {
    for (const tone of tones) {
      expect(TONE_STYLES[tone]).toBeDefined();
      expect(TONE_STYLES[tone].color).toMatch(/^#/);
      expect(TONE_STYLES[tone].soft).toMatch(/^#/);
    }
  });
});
