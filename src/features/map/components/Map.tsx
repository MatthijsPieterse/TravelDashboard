import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  LayersControl,
  LayerGroup,
} from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import { useState } from "react";
import { DynamicMarker } from "./DynamicMarker";
import Spinner from "../../../shared/components/ui/Spinner";

// hooks & utils
import { useMapData } from "../api/useMapData";
import { countryStyle, tileStyle } from "../utils/mapUtils";
import { ZoomTracker } from "./ZoomTracker";

interface MapProps {
  defaultCenter: LatLngExpression;
  defaultZoom: number;
}

const MapComponent = ({ defaultCenter, defaultZoom }: MapProps) => {
  const { data, isLoading, error } = useMapData();
  const [zoom, setZoom] = useState(defaultZoom);

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        Error loading map data: {error.message}
      </div>
    );
  if (!data) return <Spinner />;

  const { countries, visitedNames, visitedPlaces, landTiles1, landTiles05 } =
    data;

  return (
    <MapContainer
      center={defaultCenter}
      zoom={defaultZoom}
      className="h-full w-full z-0"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* <TileLayer url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png" /> */}

      <ZoomTracker setZoom={setZoom} />

      <LayersControl position="topright">
        <LayersControl.Overlay checked name="Visited Countries">
          <LayerGroup>
            {countries && (
              <GeoJSON data={countries} style={countryStyle(visitedNames)} />
            )}
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay checked name="Visited Places">
          <LayerGroup>
            {(visitedPlaces as any)?.features.map(
              (
                place: any, // eslint-disable-line @typescript-eslint/no-explicit-any
              ) => (
                <DynamicMarker
                  key={place.properties.name}
                  position={[
                    place.geometry.coordinates[1],
                    place.geometry.coordinates[0],
                  ]}
                  zoom={zoom}
                >
                  {place.properties.name}
                </DynamicMarker>
              ),
            )}
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Tile Overlay (1°)">
          <LayerGroup>
            {landTiles1 && <GeoJSON data={landTiles1} style={tileStyle} />}
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Tile Overlay (0.5°)">
          <LayerGroup>
            {landTiles05 && <GeoJSON data={landTiles05} style={tileStyle} />}
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
};

export default MapComponent;
