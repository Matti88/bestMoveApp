// file from the benvenutiavienna-test 

import { create } from 'zustand';
import { GeoJsonProperties, GeoJSON,MultiPolygon , Feature, Position ,FeatureCollection ,Polygon, GeoJsonObject  } from 'geojson';
import { persist, createJSONStorage } from 'zustand/middleware'

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
}

export interface ActiveFilters {
  maxPrice: number | null;
  minPrice: number | null;
  maxSqm: number | null;
  minSqm: number | null;
  selectedPoiIds: PoiSelection[];
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
}

export interface userSearch {
  pois: POI[];
  activeFilters: ActiveFilters;
  updatePOIs: (newPOIs: POI[]) => void;
  updateActiveFilters: (newFilters: Partial<ActiveFilters>) => void;
  resetFilters: () => void;
  addPOI: (newPOI: POI) => void;
  deletePOI: (poiId: number) => void;
  toggleSelectedPoi: (poiId: number) => void;
  toggleDangerZone: (poiId: number) => void;
  reset: () => void;

}

export const userSearchStore = create<userSearch>()(

  persist(
    (set) => ({
      pois: [],
      activeFilters: {
        maxPrice: null,
        minPrice: null,
        maxSqm: null,
        minSqm: null,
        selectedPoiIds: [],
      },
      houseListings: [],
      updatePOIs: (newPOI) => set({ pois: newPOI }),
      updateActiveFilters: (newFilters) => set((state) => ({ activeFilters: { ...state.activeFilters, ...newFilters } })),
      addPOI: (newPOI) => set((state) => {
        const maxId = Math.max(...state.pois.map((poi) => poi.id), 0);
        const updatedPOIs = [...state.pois, { ...newPOI, id: maxId + 1, dangerZone: false }];

        return {
          pois: updatedPOIs,
          activeFilters: {
            ...state.activeFilters,
            selectedPoiIds: [...state.activeFilters.selectedPoiIds, { id: maxId + 1, text: newPOI.title.slice(0, 5), isChecked: false, dangerZone: false }],
          },
        };
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
          poi.id === poiId ? { ...poi, dangerZone: !poi.dangerZone } : poi
        );

        return {
          pois: updatedPoiCharacteristics
        };
      }),

    }), 
    
    { name: "user-search", storage: createJSONStorage(() => localStorage) }
  )

);


