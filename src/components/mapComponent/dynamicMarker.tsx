import { Marker, Popup } from "react-leaflet";
import { type FC, type ReactNode } from "react";
import type { LatLngExpression } from "leaflet";
import { createIcon } from "./createIcon";

interface Props {
  position: LatLngExpression;
  zoom: number;
  children?: ReactNode;
}

const getSize = (zoom: number) => {
  return zoom < 5 ? 10 : zoom < 8 ? 15 : zoom < 12 ? 20 : 30;
};

const DynamicMarker: FC<Props> = ({ position, zoom, children }) => {
  const size = getSize(zoom);
  const icon = createIcon(size);

  return (
    <Marker position={position} icon={icon}>
      {children ? <Popup>{children}</Popup> : null}
    </Marker>
  );
};

export default DynamicMarker;
