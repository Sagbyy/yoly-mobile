import Mapbox from "@rnmapbox/maps";

// Public token, safe to ship in the client (the secret DOWNLOADS:READ token is build-time only).
export const MAPBOX_TOKEN = process.env.EXPO_PUBLIC_MAPBOX_TOKEN ?? "";

if (MAPBOX_TOKEN) {
  Mapbox.setAccessToken(MAPBOX_TOKEN);
}

export { Mapbox };
