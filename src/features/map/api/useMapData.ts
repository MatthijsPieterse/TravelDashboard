// src/features/map/api/useMapData.ts
import { useQuery } from "@tanstack/react-query";
import type { GeoJsonObject } from "geojson";
import { fetcher, getBaseUrl } from "#shared/lib/fetcher";
import { countryNameMap } from "../../../shared/utils/countryNameMap";

interface MapData {
  countries: GeoJsonObject;
  visitedNames: string[];
  visitedPlaces: GeoJsonObject;
  landTiles1: GeoJsonObject;
  landTiles05: GeoJsonObject;
}

const fetchMapData = async (): Promise<MapData> => {
  const base = getBaseUrl();

  const [
    countriesData,
    visitedCountriesData,
    visitedPlacesData,
    landTiles1Data,
    landTiles05Data,
  ] = await Promise.all([
    fetcher<GeoJsonObject>(`${base}data/source/countriesPolygons.geojson`),
    fetcher<GeoJsonObject>(`${base}data/source/visitedCountries.geojson`),
    fetcher<GeoJsonObject>(`${base}data/source/visitedPlaces.geojson`),
    fetcher<GeoJsonObject>(`${base}data/app/overlays/tileOverlay_1.geojson`),
    fetcher<GeoJsonObject>(`${base}data/app/overlays/tileOverlay_0.5.geojson`),
  ]);

  // Extract visited country names in local mapping
  const visitedNames =
    (visitedCountriesData as any)?.features // eslint-disable-line @typescript-eslint/no-explicit-any
      ?.map((f: any) => f?.properties?.name) // eslint-disable-line @typescript-eslint/no-explicit-any
      .filter((name: string | undefined): name is string => Boolean(name))
      .map(
        (englishName: string) => countryNameMap[englishName] ?? englishName,
      ) || [];

  return {
    countries: countriesData,
    visitedNames,
    visitedPlaces: visitedPlacesData,
    landTiles1: landTiles1Data,
    landTiles05: landTiles05Data,
  };
};

export const useMapData = () => {
  return useQuery<MapData>({
    queryKey: ["mapData"],
    queryFn: fetchMapData,
    staleTime: 1000 * 60 * 5, // cache for 5 min
    refetchOnWindowFocus: false,
  });
};
