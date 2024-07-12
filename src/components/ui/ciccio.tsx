import React from 'react';
import { userSearchStore, ActiveFilters, POI } from '@/store/user-search';
import ChipWithCheckbox from '@/components/ui/ChipArray';
import { FeatureCollection, houselistingStore } from '@/store/houselistingStore';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/shadcn/card";
import { Label } from "@/components/ui/shadcn/label";
import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";

import { difference, featureCollection } from '@turf/turf';
import { GeoJsonProperties, GeoJSON, MultiPolygon, Feature, Position, Polygon, GeoJsonObject } from 'geojson';
type GeoJSONGeometry = Polygon | MultiPolygon | undefined;

const FiltersComponent: React.FC = () => {
  const activeFilters = userSearchStore((state) => state.activeFilters);
  const list_selectionPoi = activeFilters.selectedPoiIds;
  const maximumPrice = activeFilters.maxPrice;
  const minimumSqm = activeFilters.minSqm;
  const updateHouseListings = houselistingStore((state) => state.updateHouseListings);
  const updateActiveFilters = userSearchStore((state) => state.updateActiveFilters);
  const toggleSelectedPoi = userSearchStore((state) => state.toggleSelectedPoi);
  const pois = userSearchStore((state) => state.pois);
  const { houseListings } = houselistingStore.getState();

  async function triggerNewSearch() {
    if (checkPropertiesAndSelection(activeFilters)) {
      try {
        let filteredData = houseListings.map(house => {
          // setting the displayed value to true
          let displayed = true;

          // testing if a minimum squared meter exists and if the house is too small set the display value to false
          if (minimumSqm && house.sqm <= minimumSqm) {
            displayed = false;
          }

          // testing if maximum price exists and if the house is too expensive
          if (maximumPrice && house.price >= maximumPrice) {
            displayed = false;
          }

          house.displayed = displayed;
          return house;
        });

        // use all the active POIs to make a selection if the houses are within the polygons of the POIs
        const selectionCheck = activeFilters.selectedPoiIds.filter(poi => poi.isChecked);
        
        // split the pois into danger zone and not danger zone and calculate the difference of the first 2
        const dangerZones = pois.filter(poi => poi.dangerZone).map(poi => poi.isochrone);
        const notDangerZones = pois.filter(poi => !poi.dangerZone).map(poi => poi.isochrone);
        const difference_dangerZones = difference(featureCollection([notDangerZones[0].features[0], dangerZones[0].features[0]]));
        console.log("notDangerZones: ", notDangerZones);
        console.log("dangerZones: ", dangerZones);
        console.log("difference_dangerZones", difference_dangerZones)


        // Filter pois with raytracing
        selectionCheck.forEach(poiUsedForFilter => {
          const isochrone = pois.filter(poi => !poi.dangerZone).find(actualPoi => poiUsedForFilter.id === actualPoi.id)?.isochrone;
          const dangerZones = pois.filter(poi => poi.dangerZone).map(poi => poi.isochrone);
            
          // TODO: filter out from the isochrone all the danger zones by using the difference method
          /// This is an example difference method: difference(featureCollection([original_isochrone, dangerZone_toClip_out]));

          if (isochrone) {
            filteredData.map(house => {
              if (house.displayed) { // only check if house displayed property is still true - this is evaluated by the previous passage
                
                if (dangerZones.length > 0) {
                  
                  dangerZones.forEach(dangerZone => {
                    const dangerZone_toClip_out = dangerZone.features[0];
                    const original_isochrone = isochrone.features[0];
                    const POLYGON_where_to_search_the_house = difference(featureCollection([original_isochrone, dangerZone_toClip_out]));
                    //house.displayed = checkHouseInReachableArea(house.lon, house.lat, POLYGON_where_to_search_the_house);
                  });
                } else {
                  house.displayed = checkHouseInReachableArea(house.lon, house.lat, isochrone.features[0]);
                }
                
              }
            
            });
          }
        });

        await updateHouseListings(filteredData);
      } catch (error) {
        console.error('Error updating houses:', error);
      }
    }
  }

  function checkHouseInReachableArea(
    longitude: number,
    latitude: number,
    list_of_shapes: Feature<Polygon | MultiPolygon, GeoJsonProperties> | number[][][] | null
  ): boolean {
    if (list_of_shapes === null) {
      return false;
    }
  
    if (isFeature(list_of_shapes)) {
      const geometry = list_of_shapes.geometry;
  
      if (geometry.type === "MultiPolygon") {
        const manyNestedPositions = geometry.coordinates;
  
        for (const basicPolygons of manyNestedPositions) {
          for (const basicPolygon of basicPolygons) {
            if (rayTracingMethod(longitude, latitude, basicPolygon)) {
              return true;
            }
          }
        }
      } else if (geometry.type === "Polygon") {
        const manyNestedPositions = geometry.coordinates;
  
        for (const basicPolygon of manyNestedPositions) {
          if (rayTracingMethod(longitude, latitude, basicPolygon)) {
            return true;
          }
        }
      }
    } 

    return false;
  }

  function isFeature(shape: any): shape is Feature<Polygon | MultiPolygon, GeoJsonProperties> {
    return shape && shape.type === "Feature" && shape.geometry && shape.geometry.type;
  }

  


  function rayTracingMethod(x: number, y: number, poly: number[][]): boolean {
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


  function checkPropertiesAndSelection(obj: ActiveFilters): boolean {
    // Check if any of the specified properties is not null
    const propertyCheck = Object.values(obj).some(prop => prop !== null);

    // Check if any object in selectedPoiIds has isChecked set to true
    const selectionCheck = obj.selectedPoiIds.some(poi => poi.isChecked);

    // Return true if any of the conditions is true
    return propertyCheck || selectionCheck;
  }


  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    // Use updateActiveFilters to update the state
    updateActiveFilters({ [name]: value });
  };

  return (

    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Search Filters</CardTitle>
        <CardDescription>Refine here your search by apply filter by price, area and Point of Interest</CardDescription>
      </CardHeader>
      <form onSubmit={triggerNewSearch}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1">
          <label className="block mb-2">POI Isochrones:</label>
            {/* Chips with checkboxes */}
            <div className="flex mb-4">
                <br/>
                {list_selectionPoi?.map((chip) => (
                  
                  <ChipWithCheckbox
                    key={chip.id}
                    id={chip.id}
                    text={chip.text}
                    isChecked={chip.isChecked}
                    onToggle={() => toggleSelectedPoi(chip.id)}
                  />

                ))}

            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">

            {/* Maximum Price */}
            <div className="space-y-2">
              <Label htmlFor="maxPrice">Max Price</Label>
              <Input type="number" placeholder="Max Price" name="maxPrice"  onChange={handleChange} value={maximumPrice || ''} />
            </div>

            {/* Minimum Space */}
            <div className="space-y-2">
              <label htmlFor="minSpace">Min Space</label>
              <Input type="number" placeholder="Min Sq. Meters" name="minSqm"  onChange={handleChange} value={minimumSqm || ''} />
            </div>

          </div>

        </CardContent>
        <CardFooter>
          <Button type='submit' className="w-full">Search</Button>
        </CardFooter>
      </form>
    </Card>
  );
};




export default FiltersComponent;

