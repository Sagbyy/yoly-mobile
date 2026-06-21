import { colors } from "@/shared/config/tokens";
import type { LngLat } from "@/shared/lib/geo";

export interface MapZone {
  id: string;
  label: string;
  center: LngLat;
  radiusMeters: number;
  color: string;
}

// Static placeholder until wired to the live tracking API (the watch's GPS).
// Coordinates are [longitude, latitude] (GeoJSON / Mapbox order).
export const liveLocation = {
  initials: "M",
  name: "Maya",
  age: 8,
  address: "12 rue Berthelot",
  lastSeen: "il y a 2 min",
  zoneLabel: "Zone sûre",
  updatedAgo: "il y a 8s",
  battery: "78%",
  bpm: "72 bpm",
  signal: "Bon",

  /** Current position of the child's watch. */
  position: [2.3505, 48.854] as LngLat,
  /** Default camera zoom. */
  zoom: 14.4,
};

export const mapZones: MapZone[] = [
  {
    id: "home",
    label: "Maison",
    center: [2.347, 48.85],
    radiusMeters: 130,
    color: colors.health,
  },
  {
    id: "school",
    label: "École",
    center: [2.354, 48.8575],
    radiusMeters: 160,
    color: colors.accent,
  },
];

/** Today's route (home → school). */
export const routePath: LngLat[] = [
  [2.347, 48.85],
  [2.3485, 48.8515],
  [2.35, 48.8538],
  [2.352, 48.8558],
  [2.354, 48.8575],
];
