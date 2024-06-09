import { openDB } from 'idb';
 

const DB_NAME = 'HousesDB';
const DB_VERSION = 1;
const STORE_NAME = 'houses';

export type House = {
  address: string;
  price: number;
  image_url: string;
  longitude: number;
  latitude: number;
  title: string;
  date: string;
};

export type ReadHouse = {
  id: number;
  address: string;
  price: number;
  image_url: string;
  longitude: number;
  latitude: number;
  title: string;
  date: string;
}



const initDB = async () => {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: 'id',
          autoIncrement: true,
        });
        const houseFields = [ 'address', 'price', 'image_url', 'longitude', 'latitude', 'title', 'date'];
        for (const field of houseFields) {
          store.createIndex(field, field, { unique: false });
        }
      }
    },
  });
  return db;
};

export const addHouse = async (house: House) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  await tx.store.add(house);
  await tx.done;
};

export const updateHouse = async (house: ReadHouse) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  await tx.store.put(house);
  await tx.done;
};

export const removeHouse = async (id: number) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  await tx.store.delete(id);
  await tx.done;
};

export const getAllHouses = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};

export const getHouseById = async (id: number) => {
  const db = await initDB();
  return db.get(STORE_NAME, id);
};

// Prepopulate the database with some records
const prepopulateDB = async () => {
  const db = await initDB();
  const count = await db.count(STORE_NAME);

  // Only prepopulate if the store is empty
  if (count === 0) {
    const houses = [
      {
        address: '123 Main St',
        price: 250000,
        image_url: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        longitude: -122.431297,
        latitude: 37.773972,
        title: 'Beautiful Family Home',
        date: '2022-01-01',
      },
      {
        address: '456 Maple Ave',
        price: 320000,
        image_url: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        longitude: -122.4194,
        latitude: 37.7749,
        title: 'Modern Apartment',
        date: '2022-01-01',
      },
      {
        address: '789 Oak Dr',
        price: 450000,
        image_url: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        longitude: -122.4184,
        latitude: 37.7799,
        title: 'Luxurious Villa',
        date: '2022-01-01',
      },
    ];

    for (const house of houses) {
      await addHouse(house);
    }
  }
};

prepopulateDB();

