/** [longitude, latitude] — the order Mapbox / GeoJSON expect. */
export type LngLat = [number, number];

/**
 * Builds a GeoJSON Polygon approximating a geographic circle, so geofence
 * zones render at their real metric radius and scale correctly with zoom.
 */
export function circlePolygon(
  center: LngLat,
  radiusMeters: number,
  steps = 64,
): GeoJSON.Feature<GeoJSON.Polygon> {
  const [lng, lat] = center;
  const earth = 6378137; // metres
  const dLat = (radiusMeters / earth) * (180 / Math.PI);
  const dLng =
    (radiusMeters / (earth * Math.cos((Math.PI * lat) / 180))) * (180 / Math.PI);

  const ring: LngLat[] = [];
  for (let i = 0; i <= steps; i++) {
    const theta = (i / steps) * 2 * Math.PI;
    ring.push([lng + dLng * Math.cos(theta), lat + dLat * Math.sin(theta)]);
  }

  return {
    type: "Feature",
    properties: {},
    geometry: { type: "Polygon", coordinates: [ring] },
  };
}

/** Builds a GeoJSON LineString feature from a list of coordinates. */
export function lineString(
  coordinates: LngLat[],
): GeoJSON.Feature<GeoJSON.LineString> {
  return {
    type: "Feature",
    properties: {},
    geometry: { type: "LineString", coordinates },
  };
}
