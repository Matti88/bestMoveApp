// file from the benvenutiavienna-test 

import { create } from 'zustand';
import { GeoJsonProperties, GeoJSON,MultiPolygon , Feature, Position ,FeatureCollection ,Polygon, GeoJsonObject  } from 'geojson';
import { persist, createJSONStorage } from 'zustand/middleware'
import { HouseListing } from '@/store/houselistingStore';

interface GeoJSONFeatureCollection {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
}

interface GeoJSONFeature {
  type: "Feature";
  properties: {
    stroke: string;
    "stroke-width": number;
    "stroke-opacity": number;
    fill: string;
    "fill-opacity": number;
  };
  geometry: GeoJSONMultiPolygon;
}

interface GeoJSONMultiPolygon {
  type: "MultiPolygon";
  coordinates: number[][][][];
}

export interface PoiSelection {
  id: number;
  text: string;
  isChecked: boolean;
  poiColor: string;
  poiSwapColor: string;
}

export interface ActiveFilters {
  maxPrice: number | null;
  minPrice: number | null;
  maxSqm: number | null;
  minSqm: number | null;
  selectedPoiIds: PoiSelection[];
  searchStats: { 
    count: number;
    averagePrice: number;
    averageSqm: number;
    medianPrice: number;
    medianSqm: number;
    maxPrice: number;
    minPrice: number;
    maxSqm: number;
    minSqm: number;
}
}

export interface cooSquares {
  lon: {
    max: number,
    min: number
  },
  lat: {
    max: number,
    min: number
  }
}

export interface POI {
  id: number;
  address: string;
  lon: number;
  lat: number;
  modeOfTransportation: string;
  timeRange: number;
  isochrone: GeoJSONFeatureCollection;
  title: string;
  minmaxSquare: cooSquares;
  dangerZone?: boolean;
  color: string;
  colorSwap: string;
}

export interface userSearch {
  updateSearchStats: (housesFilteredbyNumericFilters: HouseListing[]) => void;
  pois: POI[];
  activeFilters: ActiveFilters;
  currentColorIndex: number;
  getPoiColor: (poiId: number) => string;  
  updatePOIs: (newPOIs: POI[]) => void;
  updateActiveFilters: (newFilters: Partial<ActiveFilters>) => void;
  resetFilters: () => void;
  addPOI: (newPOI: POI) => void;
  deletePOI: (poiId: number) => void;
  toggleSelectedPoi: (poiId: number) => void;
  toggleDangerZone: (poiId: number) => void;
  reset: () => void;
  

}



function median(numbers: number[]): number {
  const sortedNumbers = numbers.sort((a, b) => a - b);
  const middle = Math.floor(sortedNumbers.length / 2);

  if (sortedNumbers.length % 2 === 0) {
    return (sortedNumbers[middle - 1] + sortedNumbers[middle]) / 2;
  }

  return sortedNumbers[middle];
}

function calculateStatistics(housesFilteredbyNumericFilters: HouseListing[]) {
  
  const filteredHouses = housesFilteredbyNumericFilters.filter(house => house.displayed);

  if (filteredHouses.length === 0) {
    return {
      count: 0,
      averagePrice: 0,
      averageSqm: 0,
      medianPrice: 0,
      medianSqm: 0,
      maxPrice: 0,
      minPrice: 0,
      maxSqm: 0,
      minSqm: 0,
    };
  }

  return {
    count: filteredHouses.length,
    maxPrice: Math.round(Math.max(...filteredHouses.map(house => house.price))),
    maxSqm: Math.round(Math.max(...filteredHouses.map(house => house.sqm))),
    minPrice: Math.round(Math.min(...filteredHouses.map(house => house.price))),
    minSqm: Math.round(Math.min(...filteredHouses.map(house => house.sqm))),
    averagePrice: Math.round(filteredHouses.reduce((sum, house) => sum + house.price, 0) / filteredHouses.length),
    averageSqm: Math.round(filteredHouses.reduce((sum, house) => sum + house.sqm, 0) / filteredHouses.length),
    medianPrice: Math.round(median(filteredHouses.map(house => house.price))),
    medianSqm: Math.round(median(filteredHouses.map(house => house.sqm))),
  };
}

                
const colors = ['#324499', '#ff6f00',  '#329955', '#f2d600' , '#993276','#769932']

export const userSearchStore = create<userSearch>()(

  persist(
    (set, get) => ({
      pois: [],
      activeFilters: {
        maxPrice: null,
        minPrice: null,
        maxSqm: null,
        minSqm: null,
        selectedPoiIds: [], 
        searchStats: {  
          count: 0,
          averagePrice: 0,
          averageSqm: 0,
          medianPrice: 0,
          medianSqm: 0,
          maxPrice: 0,
          minPrice: 0,
          maxSqm: 0,
          minSqm: 0
        }
      },
      currentColorIndex: 0,
      houseListings: [],
      updatePOIs: (newPOI) => set({ pois: newPOI }),
      updateActiveFilters: (newFilters) => set((state) => ({ activeFilters: { ...state.activeFilters, ...newFilters } })),
      updateSearchStats: (housesFilteredbyNumericFilters: HouseListing[]) => {
        const stats = calculateStatistics(housesFilteredbyNumericFilters);
      console.log(stats);
        set((state) => ({
          activeFilters: {
            ...state.activeFilters,
            searchStats: stats,
          },
        }));  
      },
      addPOI: (newPOI: POI & {dangerZone?: boolean}) => set((state) => {
        const maxId = Math.max(...state.pois.map((poi) => poi.id), 0);
        if (newPOI.dangerZone) {
        const color =  '#171716' 
        const colorSwap =  colors[state.currentColorIndex]  
        const updatedPOIs = [...state.pois, { ...newPOI, id: maxId + 1, dangerZone: newPOI.dangerZone ?? false, color, colorSwap }];
        return {
          pois: updatedPOIs,
          activeFilters: {
            ...state.activeFilters,
            selectedPoiIds: [...state.activeFilters.selectedPoiIds, { id: maxId + 1, text: newPOI.title.slice(0, 5), isChecked: false, poiColor: color, poiSwapColor: colorSwap}],
          },
          currentColorIndex: (state.currentColorIndex + 1) % colors.length,
        };
        } else {
          const color =  colors[state.currentColorIndex] 
          const colorSwap =  '#171716' 
          const updatedPOIs = [...state.pois, { ...newPOI, id: maxId + 1, dangerZone: newPOI.dangerZone ?? false, color, colorSwap }];
          return {
            pois: updatedPOIs,
            activeFilters: {
              ...state.activeFilters,
              selectedPoiIds: [...state.activeFilters.selectedPoiIds, { id: maxId + 1, text: newPOI.title.slice(0, 5), isChecked: false, poiColor: color, poiSwapColor: colorSwap}],
            },
            currentColorIndex: (state.currentColorIndex + 1) % colors.length,
          };
        }



      }),
      deletePOI: (poiId) => set((state) => {
        const updatedPOIs = state.pois.filter((poi) => poi.id !== poiId);
        const updatedSelectedPoiIds = state.activeFilters.selectedPoiIds.filter((poi) => poi.id !== poiId);

        return {
          pois: updatedPOIs,
          activeFilters: {
            ...state.activeFilters,
            selectedPoiIds: updatedSelectedPoiIds,
          },
        };
      }),

      reset: () => {
        set({
          pois: [],
          activeFilters: {
            maxPrice: null,
            minPrice: null,
            maxSqm: null,
            minSqm: null,
            selectedPoiIds: [],
            searchStats: {  
              count: 0,
              averagePrice: 0,
              averageSqm: 0,
              medianPrice: 0,
              medianSqm: 0,
              maxPrice: 0,
              minPrice: 0,
              maxSqm: 0,
              minSqm: 0
            }
          },
        });
      },

      resetFilters: () => {
        set((state) => ({
          activeFilters: {
            maxPrice: null,
            minPrice: null,
            maxSqm: null,
            minSqm: null,
            selectedPoiIds: state.activeFilters.selectedPoiIds.map((poi) => ({ ...poi, isChecked: false })),
            searchStats: {  
              count: 0,
              averagePrice: 0,
              averageSqm: 0,
              medianPrice: 0,
              medianSqm: 0,
              maxPrice: 0,
              minPrice: 0,
              maxSqm: 0,
              minSqm: 0
            }
          },
        }));
      },

      toggleSelectedPoi: (poiId: number) => set((state) => {
        const updatedSelectedPoiIds = state.activeFilters.selectedPoiIds.map((poi) =>
          poi.id === poiId ? { ...poi, isChecked: !poi.isChecked } : poi
        );

        return {
          activeFilters: {
            ...state.activeFilters,
            selectedPoiIds: updatedSelectedPoiIds,
          },
        };
      }),

      toggleDangerZone: (poiId: number) => set((state) => {
        const updatedPoiCharacteristics = state.pois.map((poi) =>
          poi.id === poiId ? { ...poi, dangerZone: !poi.dangerZone, color: poi.colorSwap, colorSwap: poi.color } : poi
        );

        const updatedSelectedPoiIds = state.activeFilters.selectedPoiIds.map((poi) =>
          poi.id === poiId ? { ...poi, poiColor: poi.poiSwapColor, poiSwapColor: poi.poiColor } : poi
        );

        return {
          pois: updatedPoiCharacteristics,
          activeFilters: {
            ...state.activeFilters,
            selectedPoiIds: updatedSelectedPoiIds,
          },
        };
      }),

      getPoiColor: (poiId: number) => {
        const state = get();
        const poiColor = state.pois.find((poi) => poi.id === poiId)?.color;
        return poiColor || '#00bfff';
      },

    }), 
    
    { name: "user-search", storage: createJSONStorage(() => localStorage) }
  )

);


