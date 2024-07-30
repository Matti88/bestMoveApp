import React, { useState } from 'react';
import { handleFormSubmit } from '@/api/api';
import { Button } from "@/components/ui/shadcn/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/shadcn/drawer";
import { userSearchStore, POI } from '@/store/user-search';
import { Label } from "@/components/ui/shadcn/label";
import { Input } from "@/components/ui/shadcn/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem
} from "@/components/ui/shadcn/select";

const FormComponentSmallScreen: React.FC = () => {
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
    await handleFormSubmit(event, formData, pois, isDuplicatePOI, addPOI, extractBoundingBox);
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
        <Button className="w-full h-12 text-md" variant="default">Add a Point of Interest</Button>
      </DrawerTrigger>

      <DrawerContent>
        <div className="mx-auto w-full max-w-sm p-4">
          <DrawerHeader>
            <DrawerTitle>Add Point of Interest Isochrone</DrawerTitle>
            {/* <DrawerDescription>Fill out the form below and generate isochrones around your Point of Interest.</DrawerDescription> */}
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
  );
}

export default FormComponentSmallScreen;
