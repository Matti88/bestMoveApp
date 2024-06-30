// file from the benvenutiavienna-test 

import { create } from 'zustand';

export interface HouseListing {
  address?: string;
  agency?: string;
  title: string;
  collection_date?: string;
  insertionpage?: string;
  lat: number;
  lon: number;
  otherinfo?: string;
  otherinfo_2?: string;
  price?: string;
  price_num?: number;
  sqm?: string;
  sqm_num?: number;
  image?: string;
}


export interface HousesInStore {
  houseListings: HouseListing[];
  updateHouseListings: (newListings: HouseListing[]) => void;
}


const houselistingStore = create<HousesInStore>((set) => ({
  houseListings: [],
  updateHouseListings: (newListings) => set({ houseListings: newListings }),
}));



export default houselistingStore;


///ne interface
interface Coordinates {
  lat: number;
  lon: number;
}

interface Properties {
  lat: number;
  lon: number;
  mode: string;
  type: string;
  range: number;
  id: string;
}

interface Geometry {
  type: "MultiPolygon";
  coordinates: number[][][][];
}

interface Feature {
  properties: Properties;
  geometry: Geometry;
  type: "Feature";
}

interface BBox {
  // Define the properties of the BBox if applicable
}

export interface FeatureCollection {
  features: Feature[];
  type: "FeatureCollection";
  // Add the union type with 'undefined'
  properties: {
    id: string
  }
}


