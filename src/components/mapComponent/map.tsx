import "leaflet/dist/leaflet.css";
import { useEffect, useState, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  LayersControl,
  LayerGroup,
} from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import { countryNameMap } from "../../util/countryNameMap";
import { ZoomTracker } from "./ZoomTracker";
import { DynamicMarker } from "./dynamicMarker";
import Spinner from "../../util/spinner";

interface MapProps {
  defaultCenter: LatLngExpression;
  defaultZoom: number;
}

const MapComponent = ({ defaultCenter, defaultZoom }: MapProps) => {
  const [countries, setCountries] = useState<any>(null);
  const [visitedCountries, setVisitedCountries] = useState<string[]>([]);
  const [visitedPlaces, setVisitedPlaces] = useState<any>(null);
  const [zoom, setZoom] = useState<number>(defaultZoom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const base = import.meta.env.BASE_URL ?? "/";
    Promise.all([
      fetch(`${base}data/countries.geojson`).then((res) => res.json()),
      fetch(`${base}data/visitedCountries.geojson`).then((res) => res.json()),
      fetch(`${base}data/visitedPlaces.geojson`).then((res) => res.json()),
    ]).then(([countriesData, visitedCountriesData, visitedPlacesData]) => {
      setCountries(countriesData);

      const names =
        visitedCountriesData?.features
          ?.map((f: any) => f?.properties?.name)
          .filter(Boolean) || [];

      setVisitedCountries(names);
      setVisitedPlaces(visitedPlacesData);

      setLoading(false);
    });
  }, []);

  const countryStyle = useCallback(
    (feature: any) => {
      const englishName = feature?.properties?.name;
      const localName = countryNameMap[englishName];

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
    },
    [visitedCountries],
  );

  if (loading) {
    return Spinner();
  }

  return (
    <MapContainer
      center={defaultCenter}
      zoom={defaultZoom}
      style={{ width: "100%", height: "100%" }}
    >
      <ZoomTracker setZoom={setZoom} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* <TileLayer url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png" /> */}

      <LayersControl position="topright">
        <LayersControl.Overlay checked name="Visited Countries">
          <LayerGroup>
            {countries && <GeoJSON data={countries} style={countryStyle} />}
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay checked name="Visited Places">
          <LayerGroup>
            {visitedPlaces &&
              visitedPlaces.features.map((place: any, i: number) => (
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
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
};

export default MapComponent;
