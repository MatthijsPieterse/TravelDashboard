export type Point = [number, number]; // [longitude, latitude]

export interface GeoPoint {
  name: string;
  coordinates: Point;
}

export interface VisitedFeature {
  geometry: {
    coordinates: Point;
  };
  properties: {
    name: string;
  };
}

export interface VisitedGeoJSON {
  features: VisitedFeature[];
}

export type TileFeature = {
  type: "Feature";
  properties: {
    visited: boolean;
  };
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
};

export type TileFeatureCollection = {
  type: "FeatureCollection";
  features: TileFeature[];
};
