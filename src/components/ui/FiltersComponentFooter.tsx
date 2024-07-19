import React from 'react';
import { userSearchStore, ActiveFilters, POI } from '@/store/user-search'
import ChipWithCheckbox from '@/components/ui/ChipArray';
import { houselistingStore } from '@/store/houselistingStore';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/shadcn/card"
import { Label } from "@/components/ui/shadcn/label"
import { Input } from "@/components/ui/shadcn/input"
import { Button } from "@/components/ui/shadcn/button"

import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { GeoJsonProperties, GeoJSON, MultiPolygon, Feature, Position, Polygon, GeoJsonObject } from 'geojson';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/shadcn/drawer"

const FiltersComponentFooter: React.FC = () => {
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
        let housesFilteredbyNumericFilters = houseListings.map(house => {
          let displayed = true;

          if (minimumSqm! && house.sqm <= minimumSqm!) {
            displayed = false;
          }

          if (maximumPrice! && house.price >= maximumPrice!) {
            displayed = false;
          }

          house.displayed = displayed
          return house
        });

        const selectedPois = activeFilters.selectedPoiIds.filter(poi => poi.isChecked).map(poi => poi.id);
        const dangerZones = pois.filter(poi => selectedPois.includes(poi.id) && poi.dangerZone === true);
        const notDangerZones = pois.filter(poi => selectedPois.includes(poi.id) && poi.dangerZone === false);


        console.log("this is a non danger zone", notDangerZones);
        // for the not Danger Zones,keep all the houses that correspond to the numeric matches 
        notDangerZones.forEach((notDangerZone) => {

          housesFilteredbyNumericFilters = housesFilteredbyNumericFilters.map((house) => {
        
            if (house.displayed) {
              house.displayed = checkHouseInReachableArea(house.lon, house.lat, notDangerZone.isochrone.features[0].geometry.coordinates);
            }
            return house;
            
          });          
        
        });

       // for the     Danger Zones, remove all the houses that correspond to the numeric matches and/or to the house match 
        dangerZones.forEach((dangerZone) => {
          housesFilteredbyNumericFilters = housesFilteredbyNumericFilters.map(house => {
            if (house.displayed && checkHouseInReachableArea(house.lon, house.lat, dangerZone.isochrone.features[0].geometry.coordinates)) {
              house.displayed = false;
            }
            return house;
          });          
        });


        await updateHouseListings(housesFilteredbyNumericFilters);
      } catch (error) {
        console.error('Error updating houses:', error);
      }
    }
  }

  function checkHouseInReachableArea(
    longitude: number,
    latitude: number,
    list_of_shapes:  number[][][][] 
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
    const propertyCheck = Object.values(obj).some(prop => prop !== null);
    const selectedPois = obj.selectedPoiIds.some(poi => poi.isChecked);
    return propertyCheck || selectedPois;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    updateActiveFilters({ [name]: value });
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="pr-7 pl-7 pt-3 pb-3" variant="secondary"><MixerHorizontalIcon/></Button>
      </DrawerTrigger>
    <DrawerContent>
      <div className="mx-auto w-full max-w-sm p-4">
      <DrawerHeader>
        <DrawerTitle>Search Filters</DrawerTitle>
        <DrawerDescription>Refine here your search by apply filter by price, area and Point of Interest</DrawerDescription>
      </DrawerHeader>
      <form onSubmit={triggerNewSearch}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1">
            <label className="block mb-2">POI Isochrones:</label>
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
            <div className="space-y-2">
              <Label htmlFor="maxPrice">Max Price</Label>
              <Input type="number" placeholder="Max Price" name="maxPrice" onChange={handleChange} value={maximumPrice || ''} />
            </div>
            <div className="space-y-2">
              <label htmlFor="minSpace">Min Space</label>
              <Input type="number" placeholder="Min Sq. Meters" name="minSqm" onChange={handleChange} value={minimumSqm || ''} />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type='submit' className="w-full">Search</Button>
        </CardFooter>
      </form>
      </div>
    </DrawerContent>
  </Drawer>
  );
};

export default FiltersComponentFooter;
