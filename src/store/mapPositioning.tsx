// useStore.ts
import {create} from 'zustand';
import { ViewState } from 'react-map-gl';

interface StoreState {
  viewport: ViewState;
  setLatitude: (latitude: number) => void;
  setLongitude: (longitude: number) => void;
  setZoom: (zoom: number) => void;
}

const mapStore = create<StoreState>((set) => ({
  viewport: {
    latitude: 48.2121268,
    longitude: 16.3671307,
    zoom: 10,
    bearing: 0,
    pitch: 0,
    padding: { top: 0, bottom: 0, left: 0, right: 0 },
  },
  setLatitude: (latitude) => set((state) => ({
    viewport: { ...state.viewport, latitude }
  })),
  setLongitude: (longitude) => set((state) => ({
    viewport: { ...state.viewport, longitude }
  })),
  setZoom: (zoom) => set((state) => ({
    viewport: { ...state.viewport, zoom }
  })),
}));

export default mapStore;
