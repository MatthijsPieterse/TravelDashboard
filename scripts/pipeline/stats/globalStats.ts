import type { VisitedGeoJSON } from "../../types.ts";

export const getGlobalStats = (
  visitedCountries: VisitedGeoJSON,
  visitedPlaces: VisitedGeoJSON,
) => {
  return {
    totalCountries: visitedCountries.features.length,
    totalCities: visitedPlaces.features.length,
    totalContinents: 2, // set manually for now, might change it later (only if I'll specify which country and city belongs to which continent in the future)
  };
};
