import type { LucideIcon } from "lucide-react";
import {
  Globe,
  Flag,
  Building2,
  Map,
  ArrowUp,
  ArrowDown,
  Mountain,
  Flame,
  Snowflake,
  Route,
  Clock,
  Building,
  PlaneTakeoff,
  Plane,
  Car,
  Languages,
  Utensils,
  Banknote,
  Landmark,
  Timer,
  Heart,
} from "lucide-react";
import type { DashboardData } from "#shared/types/dashboardData";

export interface StatCard<DataType = DashboardData> {
  color: string;
  darkTheme?: boolean;
  icon?: LucideIcon;
  title?: string;
  subtext?: string;
  getValue: (data: DataType) => string | number;
}

// main stats
export const mainStatsMapping: StatCard[] = [
  {
    color: "emerald",
    darkTheme: true,
    icon: Flag,
    subtext: "Countries Visited",
    getValue: (data) => data.globalStats.totalCountries,
  },
  {
    color: "emerald",
    darkTheme: true,
    icon: Building2,
    subtext: "Cities Visited",
    getValue: (data) => data.globalStats.totalCities,
  },
  {
    color: "emerald",
    darkTheme: true,
    icon: Map,
    subtext: "Continents Visited",
    getValue: (data) => data.globalStats.totalContinents,
  },
  {
    color: "emerald",
    darkTheme: true,
    icon: Globe,
    subtext: "Of the world explored",
    getValue: (data) => `${data.tileStats.grid1.percentage.toFixed(2)}%`,
  },
];

// geo stats
export const geoStatsMapping: StatCard[] = [
  {
    color: "emerald",
    title: "Northernmost",
    icon: ArrowUp,
    getValue: (data) => data.geoStats.northernmost.name,
  },
  {
    color: "emerald",
    title: "Southernmost",
    icon: ArrowDown,
    getValue: (data) => data.geoStats.southernmost.name,
  },
  {
    color: "green",
    title: "Highest Point",
    icon: Mountain,
    getValue: (data) =>
      `${data.geoStats.highestpoint.name} (${data.geoStats.highestpoint.height})`,
  },
  {
    color: "lime",
    title: "Lowest Point",
    icon: Map,
    getValue: (data) =>
      `${data.geoStats.lowestpoint.name} (${data.geoStats.lowestpoint.height})`,
  },
  {
    color: "red",
    title: "Hottest Place",
    icon: Flame,
    getValue: (data) =>
      `${data.geoStats.hottestTemperature.place} (${data.geoStats.hottestTemperature.temperature})`,
  },
  {
    color: "cyan",
    title: "Coldest Place",
    icon: Snowflake,
    getValue: (data) =>
      `${data.geoStats.coldestTemperature.place} (${data.geoStats.coldestTemperature.temperature})`,
  },
];

// flight stats
export const flightMapping: StatCard[] = [
  {
    color: "yellow",
    title: "Time in Air",
    icon: Clock,
    getValue: (data) => data.transportation.timeInAir,
  },
  {
    color: "slate",
    title: "Airports Visited",
    icon: Building,
    getValue: (data) => data.transportation.airportsBeen,
  },
  {
    color: "sky",
    title: "Airlines Flown",
    icon: PlaneTakeoff,
    getValue: (data) => data.transportation.airlinesFlown,
  },
  {
    color: "sky",
    title: "Flights Taken",
    icon: Plane,
    getValue: (data) => data.transportation.flightsTaken,
  },
];

// transportation stats
export const transportationMapping: StatCard[] = [
  {
    color: "orange",
    title: "Total Distance Traveled",
    icon: Car,
    getValue: (data) => data.transportation.distanceTraveled.total,
  },
  ...["plane", "train", "bus", "boat", "car", "bike"].map((mode) => ({
    color: "amber",
    title: `${mode.charAt(0).toUpperCase() + mode.slice(1)} Distance`,
    icon: Route,
    getValue: (data: DashboardData) =>
      data.transportation.distanceTraveled[mode],
  })),
];

// cultural stats
export const culturalMapping: StatCard[] = [
  {
    color: "indigo",
    title: "Languages Heard",
    icon: Languages,
    getValue: (data) => data.cultural.languagesHeard.allDetailed,
  },
  {
    color: "rose",
    title: "Cuisines Tried",
    icon: Utensils,
    getValue: (data) => data.cultural.cuisinesTried,
  },
  {
    color: "emerald",
    title: "Currencies Used",
    icon: Banknote,
    getValue: (data) => data.cultural.currenciesUsed,
  },
  {
    color: "violet",
    title: "Time Zones Visited",
    icon: Clock,
    getValue: (data) =>
      `${data.cultural.timeZones.visited} / ${data.cultural.timeZones.total}`,
  },
  {
    color: "amber",
    title: "UNESCO Sites",
    icon: Landmark,
    getValue: (data) => data.cultural.UNESCO,
  },
];

// trip records
export const tripRecordsMapping: StatCard[] = [
  {
    color: "teal",
    title: "Longest Trip (days)",
    icon: Timer,
    getValue: (data) => data.tripRecords.longestTrip,
  },
  {
    color: "teal",
    title: "Shortest Trip (days)",
    icon: Clock,
    getValue: (data) => data.tripRecords.shortestTrip,
  },
];

// personal favorites
export const personalFavoritesMapping: StatCard[] = [
  {
    color: "rose",
    title: "Favorite Countries",
    icon: Heart,
    getValue: (data) =>
      data.personal.favouriteTravelDestinations.overall.countries.join(", "),
  },
  {
    color: "amber",
    title: "Favorite Cities",
    icon: Building2,
    getValue: (data) =>
      data.personal.favouriteTravelDestinations.overall.cities.join(", "),
  },
];

// export const mainStatsConfig = [
//   {
//     color: "emerald",
//     darkTheme: true,
//     path: "globalStats.totalCountries",
//     icon: Flag,
//     subtext: "Countries Visited",
//   },
//   {
//     color: "emerald",
//     darkTheme: true,
//     path: "globalStats.totalCities",
//     icon: Building2,
//     subtext: "Cities Visited",
//   },
//   {
//     color: "emerald",
//     darkTheme: true,
//     path: "globalStats.totalContinents",
//     icon: Map,
//     subtext: "Continents Visited",
//   },
//   {
//     color: "emerald",
//     darkTheme: true,
//     path: "tileStats.grid1.percentage",
//     icon: Globe,
//     format: (v: number) => (v).toFixed(2) + "%",
//     subtext: "Of the world explored",
//   },
// ];

// export const geoStatsConfig = [
//   {
//     color: "emerald",
//     title: "Northernmost",
//     path: "geoStats.northernmost.name",
//     icon: ArrowUp,
//   },
//   {
//     color: "emerald",
//     title: "Southernmost",
//     path: "geoStats.southernmost.name",
//     icon: ArrowDown,
//   },
//   {
//     color: "green",
//     title: "Highest Point",
//     path: "geoStats.highestpoint",
//     icon: Mountain,
//     format: (v: any) => `${v.name} (${v.height})`,
//   },
//   {
//     color: "lime",
//     title: "Lowest Point",
//     path: "geoStats.lowestpoint",
//     icon: Map,
//     format: (v: any) => `${v.name} (${v.height})`,
//   },
//   {
//     color: "red",
//     title: "Hottest Place",
//     path: "geoStats.hottestTemperature",
//     icon: Flame,
//     format: (v: any) => `${v.place} (${v.temperature})`,
//   },
//   {
//     color: "cyan",
//     title: "Coldest Place",
//     path: "geoStats.coldestTemperature",
//     icon: Snowflake,
//     format: (v: any) => `${v.place} (${v.temperature})`,
//   },
// ];

// export const flightConfig = [
//   {
//     color: "yellow",
//     title: "Time in Air",
//     path: "transportation.timeInAir",
//     icon: Clock,
//   },
//   {
//     color: "slate",
//     title: "Airports Visited",
//     path: "transportation.airportsBeen",
//     icon: Building,
//   },
//   {
//     color: "sky",
//     title: "Airlines Flown",
//     path: "transportation.airlinesFlown",
//     icon: PlaneTakeoff,
//   },
//   {
//     color: "sky",
//     title: "Flights Taken",
//     path: "transportation.flightsTaken",
//     icon: Plane,
//   },
// ];

// export const transportationConfig = [
//   {
//     color: "orange",
//     title: "Total Distance Traveled",
//     path: "transportation.distanceTraveled.total",
//     icon: Car,
//   },
//   ...["plane","train","bus","boat","car","bike"].map((mode) => ({
//     color: "amber",
//     title: `${mode.charAt(0).toUpperCase() + mode.slice(1)} Distance`,
//     path: `transportation.distanceTraveled.${mode}`,
//     icon: Route,
//   })),
// ];

// export const culturalConfig = [
//   {
//     color: "indigo",
//     title: "Languages Heard",
//     path: "cultural.languagesHeard.allDetailed",
//     icon: Languages,
//   },
//   {
//     color: "rose",
//     title: "Cuisines Tried",
//     path: "cultural.cuisinesTried",
//     icon: Utensils,
//   },
//   {
//     color: "emerald",
//     title: "Currencies Used",
//     path: "cultural.currenciesUsed",
//     icon: Banknote,
//   },
//   {
//     color: "violet",
//     title: "Time Zones Visited",
//     path: "cultural.timeZones",
//     icon: Clock,
//     format: (v: any) => `${v.visited} / ${v.total}`,
//   },
//   {
//     color: "amber",
//     title: "UNESCO Sites",
//     path: "cultural.UNESCO",
//     icon: Landmark,
//   },
// ];

// export const tripRecordsConfig = [
//   {
//     color: "teal",
//     title: "Longest Trip (days)",
//     path: "tripRecords.longestTrip",
//     icon: Timer,
//   },
//   {
//     color: "teal",
//     title: "Shortest Trip (days)",
//     path: "tripRecords.shortestTrip",
//     icon: Clock,
//   },
// ];

// export const personalFavoritesConfig = [
//   {
//     color: "rose",
//     title: "Favorite Countries",
//     path: "personal.favouriteTravelDestinations.overall.countries",
//     icon: Heart,
//     format: (v: any[]) => v.join(", "),
//   },
//   {
//     color: "amber",
//     title: "Favorite Cities",
//     path: "personal.favouriteTravelDestinations.overall.cities",
//     icon: Building2,
//     format: (v: any[]) => v.join(", "),
//   },
// ];
