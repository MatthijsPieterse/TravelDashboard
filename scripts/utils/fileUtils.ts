import fs from "fs";
import path from "path";

// Folder paths
export const DATA_PATH = "public/data";
export const OUTPUT_DIR_APP = DATA_PATH + "/app";
export const OUTPUT_DIR_OVERLAYS = OUTPUT_DIR_APP + "/overlays";
export const INPUT_DIR_SOURCE = DATA_PATH + "/source";
export const DIR_TILES = DATA_PATH + "/tiles";

// File path
export const COUNTRIESPOLYGONS_FILE = `${INPUT_DIR_SOURCE}/countriesPolygons.geojson`;

export const readJSON = <T>(filePath: string): T => {
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
};

export const writeJSON = (filePath: string, data: unknown) => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

export const joinPath = (pathConst: string, ...segments: string[]) =>
  path.join(process.cwd(), pathConst, ...segments);
