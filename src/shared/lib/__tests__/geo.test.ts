import { circlePolygon, lineString } from "../geo";

describe("circlePolygon", () => {
  it("returns a closed GeoJSON polygon with steps+1 points", () => {
    const feature = circlePolygon([2.35, 48.85], 100, 32);
    expect(feature.type).toBe("Feature");
    expect(feature.geometry.type).toBe("Polygon");
    const ring = feature.geometry.coordinates[0];
    expect(ring).toHaveLength(33);
    expect(ring[0][0]).toBeCloseTo(ring[ring.length - 1][0]);
    expect(ring[0][1]).toBeCloseTo(ring[ring.length - 1][1]);
  });

  it("is centered on the given coordinate", () => {
    const center: [number, number] = [2.35, 48.85];
    const ring = circlePolygon(center, 200, 64).geometry.coordinates[0];
    const lngs = ring.map((c) => c[0]);
    const lats = ring.map((c) => c[1]);
    expect((Math.min(...lngs) + Math.max(...lngs)) / 2).toBeCloseTo(center[0]);
    expect((Math.min(...lats) + Math.max(...lats)) / 2).toBeCloseTo(center[1]);
  });
});

describe("lineString", () => {
  it("wraps coordinates in a GeoJSON LineString feature", () => {
    const coords: [number, number][] = [
      [2.35, 48.85],
      [2.36, 48.86],
    ];
    const feature = lineString(coords);
    expect(feature.geometry.type).toBe("LineString");
    expect(feature.geometry.coordinates).toEqual(coords);
  });
});
