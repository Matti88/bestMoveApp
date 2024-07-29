import React from 'react';
import { userSearchStore } from '@/store/user-search'
import ChipArray from '@/components/ui/ChipArray';
import { houselistingStore } from '@/store/houselistingStore';

import {  CardContent, CardFooter } from "@/components/ui/shadcn/card"
import { Label } from "@/components/ui/shadcn/label"
import { Input } from "@/components/ui/shadcn/input"
import { Button } from "@/components/ui/shadcn/button"

import { MixerHorizontalIcon } from "@radix-ui/react-icons";

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
import { triggerNewSearch } from '@/api/api';

const FiltersComponentSmallScreen: React.FC = () => {
  const activeFilters = userSearchStore((state) => state.activeFilters);
  const list_selectionPoi = activeFilters.selectedPoiIds;
  const maximumPrice = activeFilters.maxPrice;
  const minimumSqm = activeFilters.minSqm;
  const updateActiveFilters = userSearchStore((state) => state.updateActiveFilters);
  const toggleSelectedPoi = userSearchStore((state) => state.toggleSelectedPoi);
  const pois = userSearchStore((state) => state.pois);
  const { houseListings } = houselistingStore.getState();

  const handleNewSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    await triggerNewSearch(activeFilters, houseListings, pois);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    updateActiveFilters({ [name]: value });
  };
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="pr-7 pl-7 pt-3 pb-3" variant="secondary"><MixerHorizontalIcon/></Button>
      </DrawerTrigger>
    <DrawerContent>
      <div className="mx-auto w-full max-w-sm p-4">
      <DrawerHeader>
        <DrawerTitle>Search Filters</DrawerTitle>
        <DrawerDescription></DrawerDescription>
      </DrawerHeader>
      <form onSubmit={handleNewSearch}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1">
          {list_selectionPoi.length > 0 ? (
            <><label className="block mb-2">POIs</label><div className="flex mb-4">
                    <br />
                    {list_selectionPoi?.map((chip) => (
                      <ChipArray
                        key={chip.id}
                        id={chip.id}
                        text={chip.text}
                        isChecked={chip.isChecked}
                        poiColor={chip.poiColor}
                        onToggle={() => toggleSelectedPoi(chip.id)} />
                    ))}
                  </div></>
          ) : null}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maxPrice">Max Price</Label>
              <Input type="number" placeholder="Max Price" name="maxPrice" onChange={handleChange} value={maximumPrice || ''} />
            </div>
            <div className="space-y-2">
              <label htmlFor="minSpace">Min Space</label>
              <Input type="number" placeholder="Min Sq. Meters" name="minSqm" onChange={handleChange} value={minimumSqm || ''} />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type='submit' className="w-full">Search</Button>
        </CardFooter>
      </form>
      </div>
    </DrawerContent>
  </Drawer>
  );
};

export default FiltersComponentSmallScreen;
