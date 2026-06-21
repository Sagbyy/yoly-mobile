import type { Href } from "expo-router";

/** Centralized route paths so screens link to each other type-safely. */
export const routes = {
  home: "/(app)/home",
  alerts: "/(app)/alerts",
  health: {
    hub: "/(app)/health",
    sleep: "/(app)/health/sleep",
    stress: "/(app)/health/stress",
    heartRate: "/(app)/health/heart-rate",
    activity: "/(app)/health/activity",
  },
  map: {
    live: "/(app)/map",
    savedZones: "/(app)/map/saved-zones",
    routeHistory: "/(app)/map/route-history",
  },
  profile: {
    hub: "/(app)/profile",
    quietModes: "/(app)/profile/quiet-modes",
    quietModeNew: "/(app)/profile/quiet-modes-new",
  },
} as const satisfies Record<string, Href | Record<string, Href>>;
