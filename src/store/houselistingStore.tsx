import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import FileSaver from 'file-saver';

import * as XLSX from "xlsx";


const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
// Desired file extesion
const fileExtension = ".xlsx";


const houseListingsExample : HouseListing[] = [
      {
        "title": "1100 Wien, 10. Bezirk, Favoriten, Arsenalstraße 8",
        "image": "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg",
        "lon": 16.412562,
        "lat": 48.630614,
        "address": "1100 Wien, 10. Bezirk, Favoriten, Arsenalstraße 8",
        "price": 1800,
        "sqm": 57,
        "id": 1,
        "displayed": false
      },
      {
        "title": "1100 Wien, 10. Bezirk, Favoriten, Arsenalstraße 8",
        "image": "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg",
        "lon": 16.638059,
        "lat": 48.09458,
        "address": "1100 Wien, 10. Bezirk, Favoriten, Arsenalstraße 8",
        "price": 1710,
        "sqm": 47,
        "id": 2,
        "displayed": false
      },
      {
        "title": "1100 Wien, 10. Bezirk, Favoriten, Davidgasse",
        "image": "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg",
        "lon": 16.25329,
        "lat": 48.199215,
        "address": "1100 Wien, 10. Bezirk, Favoriten, Davidgasse",
        "price": 1080,
        "sqm": 79,
        "id": 3,
        "displayed": false
      }]


export const exportToSpreadsheet = (data: HouseListing[], fileName: string) => {
  // Define the headers
  const headers = ["title", "image", "lon", "lat", "address", "price", "sqm"];
  
  // Map data to an array of arrays, including headers as the first row
  const dataArray: any[][] = [
    headers,
    ...data.map((house) => [ house.title, house.image, house.lon, house.lat, house.address, house.price, house.sqm])
  ]; 
  
  // Convert array of arrays to worksheet
  const workSheet = XLSX.utils.aoa_to_sheet(dataArray);
  
  // Generate a Work Book containing the above sheet
  const workBook = {
    Sheets: { data: workSheet },
    SheetNames: ["data"],
  };
  
  // Exporting the file with the desired name and extension
  const excelBuffer = XLSX.write(workBook, { bookType: "xlsx", type: "array" });
  const fileData = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(fileData, fileName + fileExtension);
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
  link?: string;

}

export interface HousesInStore {
  houseListings: HouseListing[];
  exampleHouseListing: HouseListing[];
  updateHouseListings: (newListings: HouseListing[]) => void;
  uploadNewHouseListings: (newListings: Omit<HouseListing, 'id'>[]) => void;
  addHouseListing: (newListing: Omit<HouseListing, 'id'>) => void;
  addHouseListings: (newListings: Omit<HouseListing, 'id'>[]) => void;
  removeHouseListigs: () => void;
  exportToSpreadsheet: (data: HouseListing[], fileName: string) => void;
}

let nextId = 1;

export const houselistingStore = create<HousesInStore>()(

  persist(  

    (set) => ({
      houseListings: [],
      updateHouseListings: (newListings) => set((state) => ({
        houseListings: newListings.map((listing) => ({
          ...listing,
          id: listing.id || nextId++, // Assign an id if it is absent
          displayed: listing.displayed !== undefined ? listing.displayed : true, // Ensure displayed is set
        })),
      })),
      exampleHouseListing: houseListingsExample,
      uploadNewHouseListings: (newListings) => {
        set(() => ({
          houseListings: newListings.map((listing) => ({ ...listing, id: nextId++, displayed: true })),
        }));
      }, 
      addHouseListing: (newListing) =>
        set((state) => ({
          houseListings: [...state.houseListings, { ...newListing, id: nextId++, displayed: true }],
        })),
      addHouseListings: (newListings) =>
        set((state) => ({
          houseListings: [
            ...state.houseListings.slice(1),
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


