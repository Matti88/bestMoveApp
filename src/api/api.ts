import { HouseListing, houselistingStore } from '@/store/houselistingStore';
import { POI, ActiveFilters } from '@/store/user-search';
import { checkHouseInReachableArea, checkPropertiesAndSelection } from '@/utils/utils';
import { fetchGeoapifyData, fetchGeoapifyIsochrones } from '@/store/utilityFuncts';


export const handleFormSubmit = async (
  event: React.FormEvent<HTMLFormElement>,
  formData: { title: string, location: string, time: number, transportationMode: string },
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
    color: '', // This will be set in the store
    colorSwap: '', // This will be set in the store
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

      calculateStatistics(housesFilteredbyNumericFilters);

      await houselistingStore.getState().updateHouseListings(housesFilteredbyNumericFilters);
    } catch (error) {
      console.error('Error updating houses:', error);
    }
  }
}

function calculateStatistics(housesFilteredbyNumericFilters: HouseListing[]) {
  const statistics = {
    maxPrice: Math.max(...housesFilteredbyNumericFilters.filter(house => house.displayed).map(house => house.price)),
    maxSqm: Math.max(...housesFilteredbyNumericFilters.filter(house => house.displayed).map(house => house.sqm)),
    minPrice: Math.min(...housesFilteredbyNumericFilters.filter(house => house.displayed).map(house => house.price)),
    minSqm: Math.min(...housesFilteredbyNumericFilters.filter(house => house.displayed).map(house => house.sqm)),
    averagePrice: Math.round(housesFilteredbyNumericFilters.reduce((sum, house) => sum + (house.displayed ? house.price : 0), 0) / housesFilteredbyNumericFilters.filter(house => house.displayed).length),
    averageSqm: Math.round(housesFilteredbyNumericFilters.reduce((sum, house) => sum + (house.displayed ? house.sqm : 0), 0) / housesFilteredbyNumericFilters.filter(house => house.displayed).length),
    medianPrice: median(housesFilteredbyNumericFilters.filter(house => house.displayed).map(house => house.price).sort((a, b) => a - b)),
    medianSqm: median(housesFilteredbyNumericFilters.filter(house => house.displayed).map(house => house.sqm).sort((a, b) => a - b)),
  };

  console.log(`Count: ${housesFilteredbyNumericFilters.length} - listings`);
  console.log(`Max price: ${statistics.maxPrice}, Max sqm: ${statistics.maxSqm}, Min price: ${statistics.minPrice}, Min sqm: ${statistics.minSqm}`);
  console.log(`Average price: ${statistics.averagePrice}, Average sqm: ${statistics.averageSqm}`);
  console.log(`Median price: ${statistics.medianPrice}, Median sqm: ${statistics.medianSqm}`);
}

function median(values: number[]) {
  if (values.length === 0) {
    return 0;
  }

  values.sort((a, b) => a - b);

  const half = Math.floor(values.length / 2);

  return values.length % 2 === 0 ? (values[half - 1] + values[half]) / 2 : values[half];
}

