import type { PairingStatus } from "@/shared/api/pairing";

import { lastSyncText } from "../map";

const NOW = new Date("2026-06-28T12:00:00.000Z").getTime();

describe("lastSyncText", () => {
  it("returns a non-synced message when no device is linked", () => {
    expect(lastSyncText({ linked: false }, NOW)).toBe("Montre non synchronisée");
    expect(lastSyncText(undefined, NOW)).toBe("Montre non synchronisée");
  });

  it("waits when a device is linked but never seen", () => {
    const status: PairingStatus = {
      linked: true,
      device: { deviceUuid: "abc", createdAt: "x", lastSeenAt: null },
    };
    expect(lastSyncText(status, NOW)).toBe("En attente de synchronisation");
  });

  it("formats the last sync as a relative time", () => {
    const status: PairingStatus = {
      linked: true,
      device: {
        deviceUuid: "abc",
        createdAt: "x",
        lastSeenAt: "2026-06-28T11:55:00.000Z",
      },
    };
    expect(lastSyncText(status, NOW)).toBe("Dernière synchro il y a 5 min");
  });
});
