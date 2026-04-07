import {
  readJSON,
  writeJSON,
  joinPath,
  INPUT_DIR_SOURCE,
  DIR_TILES,
  OUTPUT_DIR_APP,
} from "./utils/fileUtils.ts";
import { buildDashboardData } from "./pipeline/buildDashboardData.ts";
import type { VisitedGeoJSON } from "./types.ts";
import type { DashboardData } from "../src/shared/types/dashboardData.ts";

const run = () => {
  // Load input data
  const visitedCountries = readJSON<VisitedGeoJSON>(
    joinPath(INPUT_DIR_SOURCE, "visitedCountries.geojson"),
  );
  const visitedPlaces = readJSON<VisitedGeoJSON>(
    joinPath(INPUT_DIR_SOURCE, "visitedPlaces.geojson"),
  );
  const landTiles1 = readJSON<number[]>(
    joinPath(DIR_TILES, "landTiles_1.json"),
  );
  const landTiles05 = readJSON<number[]>(
    joinPath(DIR_TILES, "landTiles_0.5.json"),
  );

  // Build dashboard json
  const dashboardStats: DashboardData = buildDashboardData({
    visitedCountries,
    visitedPlaces,
    landTiles1,
    landTiles05,
  });

  // Write output
  writeJSON(joinPath(OUTPUT_DIR_APP, "dashboardStats.json"), dashboardStats);

  console.log("Data processing complete");
};

run();
