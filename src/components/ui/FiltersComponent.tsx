'use client';
import React from 'react';
//import  houselistingStore, {FeatureCollection} from '@/store/houselistingStore';
import { userSearchStore, ActiveFilters, POI } from '@/store/user-search'
import ChipWithCheckbox from '@/components/ui/ChipArray';
//import supabase from '@/utils/supabase/client'

import { houselistingStore, FeatureCollection } from '@/store/houselistingStore';



const FiltersComponent: React.FC = () => {

  const activeFilters = userSearchStore((state) => state.activeFilters);
  const list_selectionPoi = activeFilters.selectedPoiIds;
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

          // testing if a minumum squared meter exists and if the house is too small set the display value to false
          if (activeFilters.minSqm! && house.sqm <= activeFilters.minSqm!) {
            displayed = false;
          }

          // testing if maximum price exists and if the house is too expensive
          if (activeFilters.maxPrice! && house.price >= activeFilters.maxPrice!) {
            displayed = false;
          }

          house.displayed = displayed
          return house
        }
      
      )

      // use all the active POIs to make a selection if the houses are within the polygons of the POIs
      const selectionCheck = activeFilters.selectedPoiIds.filter(poi => poi.isChecked);

      // Filter pois with raytracing
      selectionCheck.forEach(poiUsedForFilter => {
        const isochrone = pois.find(actualPoi => poiUsedForFilter.id === actualPoi.id)?.isochrone;
        if (isochrone) {
          filteredData.map(house => {
            if (house.displayed ) // only check if house displayed property is still true - this is evealuated by  the previous passage
              {
                house.displayed  = checkHouseInReachableArea(house.lon, house.lat, isochrone.features[0].geometry.coordinates)}
              }
          );
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
    list_of_shapes: number[][][][]
  ): boolean {


    for (const basicPolygons of list_of_shapes) {
      for (const basicPolygon of basicPolygons) {
        if (rayTracingMethod(longitude, latitude, basicPolygon)) {
          return true;
        }
      }
    }
    return false;
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
    <div className={`bg-white rounded shadow p-4 bg-gray-800 text-black`}>
      <h2 className="border-b-2 border-gray-300 pb-2 mb-4 text-xl font-semibold">Filters</h2>

      <div className="flex mb-4">
        <div className="mr-4">
          <label className="block mb-2">POI Isochrones:</label>
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

      <div className="flex mb-4">
        <div className="mr-4">
          <label className="block mb-2">Max Price:</label>
          <input type="number" placeholder="Max Price" name="maxPrice" className="w-full p-2 border border-gray-300 rounded" onChange={handleChange} />
        </div>

        <div>
          <label className="block mb-2">Min Sq. Meters:</label>
          <input type="number" placeholder="Min Sq. Meters" name="minSqm" className="w-full p-2 border border-gray-300 rounded" onChange={handleChange} />
        </div>
      </div>
      <div className="flex mb-4">
        <br />
        <button onClick={triggerNewSearch} className="bg-blue-500 text-white px-4 py-2 rounded">
          Search
        </button>
      </div>

      {/* Add more filters as needed */}
    </div>
  );
};




export default FiltersComponent;







