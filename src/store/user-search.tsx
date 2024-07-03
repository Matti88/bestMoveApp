// file from the benvenutiavienna-test 

import { create } from 'zustand';

import { persist, createJSONStorage } from 'zustand/middleware'

export interface PoiSelection {
  id: number;
  text: string;
  isChecked: boolean
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
  isochrone: any;
  title: string;
  minmaxSquare: cooSquares
}

export interface userSearch {
  pois: POI[];
  activeFilters: ActiveFilters;
  updatePOIs: (newPOIs: POI[]) => void;
  updateActiveFilters: (newFilters: Partial<ActiveFilters>) => void;
  addPOI: (newPOI: POI) => void;
  deletePOI: (poiId: number) => void;
  toggleSelectedPoi: (poiId: number) => void;
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
        const updatedPOIs = [...state.pois, { ...newPOI, id: maxId + 1 }];

        return {
          pois: updatedPOIs,
          activeFilters: {
            ...state.activeFilters,
            selectedPoiIds: [...state.activeFilters.selectedPoiIds, { id: maxId + 1, text: newPOI.title.slice(0, 5), isChecked: false }],
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

    }), 
    
    { name: "user-search", storage: createJSONStorage(() => localStorage) })
)
  ;

