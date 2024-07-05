import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import FileSaver from 'file-saver';

import * as XLSX from "xlsx";


const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
// Desired file extesion
const fileExtension = ".xlsx";


export const exportToSpreadsheet = (data: HouseListing[]) => {
  const dataArray: any[][] = data.map((house) => [house.id, house.title, house.image, house.lon, house.lat, house.address, house.price, house.sqm]); // Extract the necessary properties from HouseListing
  
  const workSheet = XLSX.utils.aoa_to_sheet(dataArray);
  // Generate a Work Book containing the above sheet.
  const workBook = {
    Sheets: { data: workSheet, cols: [] },
    SheetNames: ["data"],
  };
  // Exporting the file with the desired name and extension.
  const excelBuffer = XLSX.write(workBook, { bookType: "xlsx", type: "array" });
  const fileData = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(fileData, "search_results" + fileExtension);
};

interface Coordinates {
  lat: number;
  lon: number;
}

export interface HouseListing {
  id: number; 
  title: string;
  image: string;
  lon: number;
  lat: number;
  address: string;
  price: number;
  sqm: number;
  displayed?: boolean;
}

export interface HousesInStore {
  houseListings: HouseListing[];
  updateHouseListings: (newListings: HouseListing[]) => void;
  addHouseListing: (newListing: Omit<HouseListing, 'id'>) => void;
  addHouseListings: (newListings: Omit<HouseListing, 'id'>[]) => void;
  removeHouseListigs: () => void;
  exportToSpreadsheet: (data: HouseListing[]) => void;
}

let nextId = 1;

export const houselistingStore = create<HousesInStore>()(

  persist(  

    (set) => ({
      houseListings: [],
      updateHouseListings: (newListings) => set({ houseListings: newListings }),
      addHouseListing: (newListing) =>
        set((state) => ({
          houseListings: [...state.houseListings, { ...newListing, id: nextId++, displayed: true }],
        })),
      addHouseListings: (newListings) =>
        set((state) => ({
          houseListings: [
            ...state.houseListings,
            ...newListings.map((listing) => ({ ...listing, id: nextId++, displayed: true })),
          ],
        })),
      removeHouseListigs: () => set(() => ({ houseListings: [] })),
      exportToSpreadsheet,
    }) , { name: "houses-db", storage: createJSONStorage(() => localStorage) })
);

export default houselistingStore;

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
  } | undefined;
}


