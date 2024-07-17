import React, { useState } from 'react';
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons"
import { Bar, BarChart, ResponsiveContainer } from "recharts"
import POIList from '@/components/ui/POIList';

import { Button } from "@/components/ui/shadcn/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/shadcn/drawer"


import { fetchGeoapifyData, fetchGeoapifyIsochrones } from '@/store/utilityFuncts';
import { userSearchStore, POI } from '@/store/user-search';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/shadcn/card";
import { Label } from "@/components/ui/shadcn/label";
import { Input } from "@/components/ui/shadcn/input";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem
} from "@/components/ui/shadcn/select";





const FormComponentFooter: React.FC = () => {


  const { pois, addPOI } = userSearchStore();

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
  };

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
    const lat = indirizzi.results[0].lat;
    const lon = indirizzi.results[0].lon;
    const address_formatted = indirizzi.results[0].formatted;
    const isochrone = await fetchGeoapifyIsochrones(lat, lon, formData.transportationMode, formData.time * 60);
    const squaredCoordinates = await extractBoundingBox(isochrone);

    const newPoiObject: POI = {
      id: 0,
      address: address_formatted,
      lon: lon,
      lat: lat,
      modeOfTransportation: formData.transportationMode,
      timeRange: formData.time,
      isochrone: isochrone,
      title: formData.title,
      minmaxSquare: squaredCoordinates,
    };

    if (!isDuplicatePOI(newPoiObject)) {
      addPOI(newPoiObject);
    } else {
      console.log("same POI present");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="p-2" variant="secondary">Create Point of Interest</Button>
      </DrawerTrigger>

      
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm p-4">
            <DrawerHeader>
              <DrawerTitle>Add Point of Interest Isochrone</DrawerTitle>
              <DrawerDescription>Fill out the form below and generate isochrones around your Point of Interest.</DrawerDescription>
            </DrawerHeader>

            <form onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">POI Title</Label>
              <Input name="title" type='text' onChange={handleChange} placeholder="Enter title" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Address</Label>
              <Input name="location" type="text" placeholder="Write here POI's address" onChange={handleChange} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Select name="time" onValueChange={(value) => setFormData({ ...formData, time: Number(value) })}>
                  <SelectTrigger>{formData.time} minutes</SelectTrigger>
                  <SelectContent>
                    {[5, 10, 15, 20, 25, 30, 45, 60, 70, 80, 90, 120].map((minutes) => (
                      <SelectItem key={minutes} value={minutes.toString()}>{minutes} minutes</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="transportationMode">Trans Mode</Label>
                <Select name="transportationMode" onValueChange={(value) => setFormData({ ...formData, transportationMode: value })}>
                  <SelectTrigger>{formData.transportationMode}</SelectTrigger>
                  <SelectContent>
                    <SelectItem value="walk">Walk</SelectItem>
                    <SelectItem value="transit">Transit</SelectItem>
                    <SelectItem value="drive">Car</SelectItem>
                    <SelectItem value="bicycle">Bicycle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DrawerFooter>

              <DrawerClose asChild>
                <Button type='submit' className="w-full">Add Poi</Button>
              </DrawerClose>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
            </form>
          </div>
      
        </DrawerContent>
      
    </Drawer>
  )
}

export default FormComponentFooter;