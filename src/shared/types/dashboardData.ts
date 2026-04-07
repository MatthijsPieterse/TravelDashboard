export interface DashboardData {
  globalStats: {
    totalCountries: number;
    totalCities: number;
    totalContinents: number;
  };
  tileStats: {
    grid1: { visited: number; total: number; percentage: number };
    grid05: { visited: number; total: number; percentage: number };
  };
  geoStats: {
    northernmost: { name: string; coordinates: [number, number] };
    southernmost: { name: string; coordinates: [number, number] };
    highestpoint: {
      name: string;
      coordinates: [number, number];
      height: string;
    };
    lowestpoint: {
      name: string;
      coordinates: [number, number];
      height: string;
    };
    hottestTemperature: { place: string; temperature: string };
    coldestTemperature: { place: string; temperature: string };
  };
  transportation: {
    flightsTaken: number;
    airportsBeen: number;
    airlinesFlown: number;
    timeInAir: string;
    distanceTraveled: Record<string, string>;
    longest: Record<
      string,
      { from: string; to: string; distance: string; time: string }
    >;
  };
  cultural: {
    languagesHeard: {
      inPlaceSimple: number;
      inPlaceDetailed: number;
      allSimple: number;
      allDetailed: number;
    };
    cuisinesTried: number;
    currenciesUsed: number;
    UNESCO: string;
    timeZones: { visited: number; total: number };
  };
  tripRecords: {
    longestTrip: number;
    shortestTrip: number;
  };
  personal: {
    favouriteTravelDestinations: {
      overall: { countries: string[]; cities: string[] };
      byContinent: Record<string, { countries: string[]; cities: string[] }>;
      netherlands: { cities: string[] };
    };
  };
}
