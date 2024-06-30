'use client';
import React from 'react';
import  houselistingStore, {FeatureCollection} from '@/store/houselistingStore';
import {userSearchStore, ActiveFilters} from '@/store/user-search'
import ChipWithCheckbox from '@/components/ui/ChipArray';
import supabase from '@/utils/supabase/client'

const FiltersComponent: React.FC = () => {
 

  const { activeFilters, pois, toggleSelectedPoi, updateActiveFilters } = userSearchStore()


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
  

  async function triggerNewSearch() {

    if (checkPropertiesAndSelection(activeFilters!)){

      try {

        let query = supabase
          .from('clean_insertions')
          .select('*')
          
        // making the filter for prices
        if (activeFilters.minSqm) {query = query.gte('sqm_num',activeFilters.minSqm)}
        if (activeFilters.maxPrice) {query = query.lte('price_num', activeFilters.maxPrice)}

        // loop for filtering on pois
        const selectionCheck = activeFilters.selectedPoiIds.filter(poi => poi.isChecked === true);
        selectionCheck?.forEach(poiUsedForFilter => {

        // Filtering by POI squares 

        const minMaxSquare = pois.filter(actualPoi => poiUsedForFilter.id == actualPoi.id )[0].minmaxSquare

          query = query.lte('lat', minMaxSquare?.lat.max)
          query = query.gte('lat', minMaxSquare?.lat.min)
          query = query.lte('lon', minMaxSquare?.lon.max)
          query = query.gte('lon', minMaxSquare?.lon.min)
        });

        // Launching the query
        const { data, error } = await query.limit(1000);
        
        if (error) {
          console.error('Error fetching data from clean_insertions table:', error);
          return;
        }

        let fetchedData = data ; // Assign fetched data to the variable

        // running the raytracing filtering on every poi graph
        selectionCheck?.forEach(poiUsedForFilter => { 
          const isochrone: FeatureCollection = pois.filter(actualPoi => !( poiUsedForFilter.id !== actualPoi.id) )[0].isochrone
          fetchedData  = fetchedData.filter((HouseListing) => checkHouseInReachableArea(  
                              HouseListing.lon
                            , HouseListing.lat
                            , isochrone.features[0].geometry.coordinates
                )
              )
            }
          )


          houselistingStore.setState((state) => ({
          ...state,
          houseListings: fetchedData,
        }));
      } 
      catch (error) {
        console.error('Error updating houses:', error);
      }
    }
  }



  const list_selectionPoi =  activeFilters.selectedPoiIds

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
          <input type="number" placeholder="Max Price" name="maxPrice" className="w-full p-2 border border-gray-300 rounded"  onChange={handleChange}/>
        </div>

        <div>
        <label className="block mb-2">Min Sq. Meters:</label>
          <input type="number" placeholder="Min Sq. Meters" name="minSqm" className="w-full p-2 border border-gray-300 rounded"  onChange={handleChange}/>
        </div>
      </div>
      <div className="flex mb-4">
        <br/>
        <button  onClick={triggerNewSearch} className="bg-blue-500 text-white px-4 py-2 rounded">
          Search
        </button>
      </div>

      {/* Add more filters as needed */}
    </div>
  );
};

export default FiltersComponent;
