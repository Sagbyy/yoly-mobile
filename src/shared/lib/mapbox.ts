import Mapbox from "@rnmapbox/maps";

/**
 * Public Mapbox token (safe to ship in the client). Set EXPO_PUBLIC_MAPBOX_TOKEN
 * in .env. The secret DOWNLOADS:READ token is build-time only (app.config.ts).
 */
export const MAPBOX_TOKEN = process.env.EXPO_PUBLIC_MAPBOX_TOKEN ?? "";

// Set once at module load.
if (MAPBOX_TOKEN) {
  Mapbox.setAccessToken(MAPBOX_TOKEN);
}

export { Mapbox };
