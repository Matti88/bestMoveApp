import React, { useState } from 'react';
import { fetchGeoapifyData, fetchGeoapifyIsochrones } from '@/store/utilityFuncts';
import {userSearchStore, POI} from '@/store/user-search'


const FormComponent: React.FC = ({ /* pass necessary props */ }) => {


  const {  pois, addPOI } = userSearchStore()


  const [formData, setFormData] = useState({
    title: '',
    location: '',
    time: 5,
    transportationMode: 'walk',
  });

  const isDuplicatePOI = (newPOI: POI) => {
    return pois.some(
      (poi) =>
        poi.title === newPOI.title ||
        (poi.lon === newPOI.lon &&
          poi.lat === newPOI.lat &&
          poi.timeRange === newPOI.timeRange &&
          poi.modeOfTransportation === newPOI.modeOfTransportation)
    );
  }

 async function extractBoundingBox(multipolygon: any) {
    let minLatitude = 90;
    let maxLatitude = -90;
    let minLongitude = 180;
    let maxLongitude = -180;

  
    for (const polygon of multipolygon.features[0].geometry.coordinates) {
      for (const ring of polygon) {
        for (const point of ring) {
          const [longitude, latitude] = point;
  
          minLatitude = Math.min(minLatitude, latitude);
          maxLatitude = Math.max(maxLatitude, latitude);
  
          minLongitude = Math.min(minLongitude, longitude);
          maxLongitude = Math.max(maxLongitude, longitude);
        }
      }
    }
  
    return {
      lon: {
        min: minLongitude,
        max: maxLongitude,
      },
      lat: {
        min: minLatitude,
        max: maxLatitude,
      },
    };
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const indirizzi = await fetchGeoapifyData(formData.location);
    const lat = indirizzi.results[0].lat
    const lon = indirizzi.results[0].lon
    const address_formatted = indirizzi.results[0].formatted
    const isochrone = await fetchGeoapifyIsochrones(lat, lon, formData.transportationMode, formData.time * 60)
    const squaredCoordinates = await extractBoundingBox(isochrone)
    const newPoiObject: POI = {
      id: 0,
      address: address_formatted,
      lon: lon,
      lat: lat,
      modeOfTransportation: formData.transportationMode,
      timeRange: formData.time,
      isochrone: isochrone,
      title: formData.title,
      minmaxSquare: squaredCoordinates
      
    }
    !(isDuplicatePOI(newPoiObject))? addPOI(newPoiObject) : console.log("same POI present") 
    
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (

    <form className={`bg-white rounded shadow p-8 max-w-md mx-auto bg-gray-800 text-black`} onSubmit={handleSubmit}>
      <h2 className="border-b-2 border-gray-300 pb-2 mb-6 text-xl font-semibold">Add Point of Interest</h2>

      <div className="flex mb-4">
        {/* Title Input */}
        <div className="w-full mr-4">
          <label className="block mb-2">Title:</label>
          <input name="title" type="text" onChange={handleChange} placeholder="Enter title" className="w-full p-2 border border-gray-300 rounded" />
        </div>

        {/* Autosuggest Input (Placeholder - implement as needed) */}
        <div className="w-full">
          <label className="block mb-2">Location:</label>
          <input name="location" type="text" onChange={handleChange} placeholder="Start typing for suggestions" className="w-full p-2 border border-gray-300 rounded" />
        </div>
      </div>

      <div className="flex mb-4">
        {/* Time in Minutes Dropdown */}
        <div className="w-full mr-4">
          <label className="block mb-2">Time:</label>
          <select name="time" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
            {[5, 10, 15, 20, 25, 30, 45, 60, 70, 80, 90, 120].map((minutes) => (
              <option key={minutes} value={minutes}>
                {minutes} minutes
              </option>
            ))}
          </select>
        </div>

        {/* Modes of Transportation Dropdown */}
        <div className="w-full" >
          <label className="block mb-2">Transportation Mode:</label>
          <select name="transportationMode" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
            <option value="walk">Walk</option>
            <option value="transit">Transit</option>
            <option value="drive">Car</option>
            <option value="bicycle">Bicycle</option>
          </select>
        </div>
      </div>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default FormComponent;



