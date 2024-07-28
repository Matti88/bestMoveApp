import { houselistingStore } from '@/store/houselistingStore';
import { userSearchStore, ActiveFilters } from '@/store/user-search';
import { checkHouseInReachableArea, checkPropertiesAndSelection } from '@/utils/utils';
import { HouseListing} from '@/store/houselistingStore';
import { POI } from '@/store/user-search';
import { fetchGeoapifyData, fetchGeoapifyIsochrones } from '@/store/utilityFuncts';


export const handleFormSubmit = async (
  event: React.FormEvent<HTMLFormElement>,
  formData: { title: string, location: string, time: number, transportationMode: string },
  pois: POI[],
  isDuplicatePOI: (newPOI: POI) => boolean,
  addPOI: (poi: POI) => void,
  extractBoundingBox: (multipolygon: any) => Promise<any>
) => {
  event.preventDefault();

  const indirizzi = await fetchGeoapifyData(formData.location);
  const lat = indirizzi.results[0].lat;
  const lon = indirizzi.results[0].lon;
  const address_formatted = indirizzi.results[0].formatted;
  const isochrone = await fetchGeoapifyIsochrones(lat, lon, formData.transportationMode, formData.time * 60);
  const squaredCoordinates = await extractBoundingBox(isochrone);

  const newPoiObject: POI = {
    id: 0,
    address: address_formatted,
    lon: lon,
    lat: lat,
    modeOfTransportation: formData.transportationMode,
    timeRange: formData.time,
    isochrone: isochrone,
    title: formData.title,
    minmaxSquare: squaredCoordinates,
  };

  if (!isDuplicatePOI(newPoiObject)) {
    addPOI(newPoiObject);
  } else {
    console.log("same POI present");
  }
};


export async function triggerNewSearch(activeFilters: ActiveFilters, houseListings: HouseListing[], pois: POI[]) {
  if (checkPropertiesAndSelection(activeFilters)) {
    try {
      let housesFilteredbyNumericFilters = houseListings.map(house  => {
        let displayed = true;

        if (activeFilters.minSqm! && house.sqm <= activeFilters.minSqm!) {
          displayed = false;
        }

        if (activeFilters.maxPrice! && house.price >= activeFilters.maxPrice!) {
          displayed = false;
        }

        house.displayed = displayed;
        return house;
      });

      const selectedPois = activeFilters.selectedPoiIds.filter(poi => poi.isChecked).map(poi => poi.id);
      const dangerZones = pois.filter(poi => selectedPois.includes(poi.id) && poi.dangerZone === true);
      const notDangerZones = pois.filter(poi => selectedPois.includes(poi.id) && poi.dangerZone === false);

      // For the non-danger zones
      notDangerZones.forEach((notDangerZone: any) => {
        housesFilteredbyNumericFilters = housesFilteredbyNumericFilters.map((house: any) => {
          if (house.displayed) {
            house.displayed = checkHouseInReachableArea(house.lon, house.lat, notDangerZone.isochrone.features[0].geometry.coordinates);
          }
          return house;
        });
      });

      // For the danger zones
      dangerZones.forEach((dangerZone: any) => {
        housesFilteredbyNumericFilters = housesFilteredbyNumericFilters.map((house: any) => {
          if (house.displayed && checkHouseInReachableArea(house.lon, house.lat, dangerZone.isochrone.features[0].geometry.coordinates)) {
            house.displayed = false;
          }
          return house;
        });
      });

      await houselistingStore.getState().updateHouseListings(housesFilteredbyNumericFilters);
    } catch (error) {
      console.error('Error updating houses:', error);
    }
  }
}
