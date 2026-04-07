import { countryNameMap } from "#shared/utils/countryNameMap";

export const countryStyle = (visitedCountries: string[]) => (feature: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
  const englishName = feature?.properties?.name;
  const localName = countryNameMap[englishName];
  const visited = localName
    ? visitedCountries.some((v) =>
        v.toLowerCase().includes(localName.toLowerCase()),
      )
    : false;

  return {
    fillColor: visited ? "green" : "gray",
    weight: 1,
    color: "black",
    fillOpacity: 0.5,
  };
};

export const tileStyle = (feature: any) => ({
  // eslint-disable-line @typescript-eslint/no-explicit-any
  fillColor: feature.properties.visited ? "green" : "red",
  weight: 0.5,
  fillOpacity: 0.2,
});

export const getMarkerSize = (zoom: number) =>
  zoom < 5 ? 10 : zoom < 8 ? 15 : zoom < 12 ? 20 : 30;
