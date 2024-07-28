import { ActiveFilters, POI } from '@/store/user-search'
import { GeoJsonProperties, GeoJSON, MultiPolygon, Feature, Position, Polygon, GeoJsonObject } from 'geojson';



function checkPropertiesAndSelection(obj: ActiveFilters): boolean {
    const propertyCheck = Object.values(obj).some(prop => prop !== null);
    const selectedPois = obj.selectedPoiIds.some(poi => poi.isChecked);
    return propertyCheck || selectedPois;
  }

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