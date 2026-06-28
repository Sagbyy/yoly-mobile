import type { Href } from "expo-router";

export const routes = {
  home: "/home",
  alerts: "/alerts",
  health: {
    hub: "/health",
    sleep: "/sleep",
    stress: "/stress",
    heartRate: "/heart-rate",
    activity: "/activity",
  },
  map: {
    live: "/map",
    savedZones: "/map/saved-zones",
    routeHistory: "/map/route-history",
  },
  audio: {
    recordings: "/audio",
    player: "/audio-player",
    call: "/audio-call",
    callHistory: "/audio-call-history",
  },
  profile: {
    hub: "/profile",
    quietModes: "/profile/quiet-modes",
    quietModeNew: "/profile/quiet-modes-new",
  },
} as const satisfies Record<string, Href | Record<string, Href>>;
