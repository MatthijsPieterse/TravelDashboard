import {
  writeJSON,
  joinPath,
  OUTPUT_DIR_OVERLAYS,
} from "../utils/fileUtils.ts";
import { decodeTile } from "../utils/tileUtils.ts";
import type { TileFeature, TileFeatureCollection } from "../types.ts";

const tileToPolygon = (key: number, gridSize: number) => {
  const [x, y] = decodeTile(key);

  const lon = x * gridSize - 180;
  const lat = y * gridSize - 90;

  return [
    [lon, lat],
    [lon + gridSize, lat],
    [lon + gridSize, lat + gridSize],
    [lon, lat + gridSize],
    [lon, lat],
  ];
};

export const generateTileOverlay = (
  visitedTiles: number[],
  landTiles: number[],
  gridSize: number,
) => {
  const visitedSet = new Set(visitedTiles);

  const features: TileFeature[] = landTiles.map((tile) => ({
    type: "Feature",
    properties: {
      visited: visitedSet.has(tile),
    },
    geometry: {
      type: "Polygon",
      coordinates: [tileToPolygon(tile, gridSize)],
    },
  }));

  const geojson: TileFeatureCollection = {
    type: "FeatureCollection",
    features,
  };

  const filePath = joinPath(
    OUTPUT_DIR_OVERLAYS,
    `tileOverlay_${gridSize}.geojson`,
  );

  writeJSON(filePath, geojson);
};
