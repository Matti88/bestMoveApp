import React, { useState } from 'react';
import { fetchGeoapifyData, fetchGeoapifyIsochrones } from '@/store/utilityFuncts';
import {userSearchStore, POI} from '@/store/user-search'

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/shadcn/card"
import { Label } from "@/components/ui/shadcn/label"
import { Input } from "@/components/ui/shadcn/input"
import { Textarea } from "@/components/ui/shadcn/textarea"
import { Button } from "@/components/ui/shadcn/button"

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

    console.log(formData);

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
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Add Point of Interest Isochrone</CardTitle>
        <CardDescription>Fill out the form below and generate isochrones around your Point of Interest.</CardDescription>
      </CardHeader>
    
      <form onSubmit={handleSubmit}>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">POI Title</Label>
          <Input name="title" type='text' onChange={handleChange} placeholder="Enter title" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Address</Label>
          <Input name="location"  type="text" placeholder="Write here POI's address" onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="time">Time</Label>
          <select name="time" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
            {[5, 10, 15, 20, 25, 30, 45, 60, 70, 80, 90, 120].map((minutes) => (
              <option key={minutes} value={minutes}>
                {minutes} minutes
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">          
          <label htmlFor="transportationMode">Transportation Mode:</label>
          <select name="transportationMode" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
            <option value="walk">Walk</option>
            <option value="transit">Transit</option>
            <option value="drive">Car</option>
            <option value="bicycle">Bicycle</option>
          </select>
        </div>
      </CardContent>        
      <CardFooter>
        <Button type='submit' className="w-full">Submit</Button>
      </CardFooter>
    </form>
    </Card>

  );
};

export default FormComponent;



