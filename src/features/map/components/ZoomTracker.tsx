import { useMapEvents } from "react-leaflet";

export function ZoomTracker({ setZoom }: { setZoom: (z: number) => void }) {
  useMapEvents({
    zoomend: (e: { target: { getZoom: () => number } }) => {
      setZoom(e.target.getZoom());
    },
  });
  return null;
}
