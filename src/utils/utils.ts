import { GeoJsonProperties, Feature, MultiPolygon, Polygon } from 'geojson';
import { ActiveFilters } from '@/store/user-search';

export function checkHouseInReachableArea(
  longitude: number,
  latitude: number,
  list_of_shapes: number[][][][]
): boolean {
  if (list_of_shapes === null) {
    return false;
  }

  for (const basicPolygons of list_of_shapes) {
    for (const basicPolygon of basicPolygons) {
      if (rayTracingMethod(longitude, latitude, basicPolygon)) {
        return true;
      }
    }
  }

  return false;
}

export function isFeature(shape: any): shape is Feature<Polygon | MultiPolygon, GeoJsonProperties> {
  return shape && shape.type === "Feature" && shape.geometry && shape.geometry.type;
}

export function rayTracingMethod(x: number, y: number, poly: number[][]): boolean {
  const n = poly.length;
  let inside = false;

  let [p1x, p1y] = poly[0];

  for (let i = 0; i <= n; i++) {
    const [p2x, p2y] = poly[i % n];

    if (y > Math.min(p1y, p2y)) {
      if (y <= Math.max(p1y, p2y)) {
        if (x <= Math.max(p1x, p2x)) {
          let xints = 0.0;

          if (p1y !== p2y) {
            xints = ((y - p1y) * (p2x - p1x)) / (p2y - p1y) + p1x;
          }

          if (p1x === p2x || x <= xints) {
            inside = !inside;
          }
        }
      }
    }

    p1x = p2x;
    p1y = p2y;
  }

  return inside;
}

export function checkPropertiesAndSelection(obj: ActiveFilters): boolean {
  const propertyCheck = Object.values(obj).some(prop => prop !== null);
  const selectedPois = obj.selectedPoiIds.some(poi => poi.isChecked);
  return propertyCheck || selectedPois;
}
