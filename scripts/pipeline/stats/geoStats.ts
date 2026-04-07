import type { VisitedGeoJSON, GeoPoint } from "../../types.ts";

export const getGeoStats = (
  visitedGeoJSON: VisitedGeoJSON,
): {
  northernmost: GeoPoint;
  southernmost: GeoPoint;
} => {
  if (!visitedGeoJSON.features.length) throw new Error("No features provided");

  const { north, south } = visitedGeoJSON.features.reduce(
    (acc: { north: any; south: any }, feature: any) => {
      const [, lat] = feature.geometry.coordinates;

      if (lat > acc.north.geometry.coordinates[1]) acc.north = feature;
      if (lat < acc.south.geometry.coordinates[1]) acc.south = feature;

      return acc;
    },
    {
      north: visitedGeoJSON.features[0],
      south: visitedGeoJSON.features[0],
    },
  );

  const northernmost: GeoPoint = {
    name: north.properties?.name || "N/A",
    coordinates: north.geometry.coordinates,
  };

  const southernmost: GeoPoint = {
    name: south.properties?.name || "N/A",
    coordinates: south.geometry.coordinates,
  };

  return { northernmost, southernmost };
};
