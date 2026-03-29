import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import countryNameMap from "../../util/countryNameMap";
import DynamicMarker from "./dynamicMarker";
import { useEffect, useState } from "react";
import { ZoomTracker } from "./ZoomTracker";

interface MapProps {
  defaultZoom: number;
}

const MapComponent = ({ defaultZoom }: MapProps) => {
  const [countries, setCountries] = useState<any>(null);
  const [visitedCountries, setVisitedCountries] = useState<string[]>([]);
  const [places, setPlaces] = useState<any>(null);
  const [zoom, setZoom] = useState<number>(defaultZoom);

  useEffect(() => {
    fetch("/data/countries.geojson")
      .then((res) => res.json())
      .then(setCountries);

    fetch("/data/visitedCountries.geojson")
      .then((res) => res.json())
      .then((data: any) => {
        const names =
          data?.features
            ?.map((f: any) => f?.properties?.name)
            .filter(Boolean) || [];
        setVisitedCountries(names);
      });

    fetch("/data/visitedPlaces.geojson")
      .then((res) => res.json())
      .then(setPlaces);
  }, []);

  return (
    <MapContainer
      center={[20, 0]}
      zoom={defaultZoom}
      style={{ width: "100%", height: "100%" }}
    >
      <ZoomTracker setZoom={setZoom} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {countries && (
        <GeoJSON
          data={countries}
          style={(feature: any) => {
            const englishName = feature?.properties?.name;
            const localName = countryNameMap[englishName];

            // Log missing mappings
            if (!localName) {
              console.log("Missing mapping for:", englishName);
            }

            const visited = localName
              ? visitedCountries.some((visitedName) =>
                  visitedName.toLowerCase().includes(localName.toLowerCase()),
                )
              : false;

            return {
              fillColor: visited ? "green" : "gray",
              weight: 1,
              color: "black",
              fillOpacity: 0.5,
            };
          }}
        />
      )}

      {places &&
        places.features.map((place: any, i: number) => (
          <DynamicMarker
            key={i}
            position={[
              place.geometry.coordinates[1],
              place.geometry.coordinates[0],
            ]}
            zoom={zoom}
          >
            {place.properties.name}
          </DynamicMarker>
        ))}
    </MapContainer>
  );
};

export default MapComponent;
