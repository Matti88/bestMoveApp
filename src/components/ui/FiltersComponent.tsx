import React from 'react';
import { userSearchStore, ActiveFilters, POI } from '@/store/user-search';
import ChipArray from '@/components/ui/ChipArray';
import { houselistingStore } from '@/store/houselistingStore';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/shadcn/card";
import { Label } from "@/components/ui/shadcn/label";
import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";

import { triggerNewSearch } from '@/api/api';
import { checkPropertiesAndSelection } from '@/utils/utils';

const FiltersComponent: React.FC = () => {
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
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Search Filters</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <form onSubmit={handleNewSearch}>
        <CardContent className="space-y-4">
          {/* First Row */}
          <div className="flex flex-wrap">
            {list_selectionPoi.length > 0 && (
              <>
                <Label className="block mb-2 w-full">POIs</Label>
                <div className="flex flex-wrap mb-4">
                  {list_selectionPoi.map((chip) => (
                    <ChipArray
                      key={chip.id}
                      id={chip.id}
                      text={chip.text}
                      isChecked={chip.isChecked}
                      poiColor={chip.poiColor}
                      onToggle={() => toggleSelectedPoi(chip.id)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maxPrice">Max Price</Label>
              <Input
                type="number"
                placeholder="Max Price"
                name="maxPrice"
                onChange={handleChange}
                value={maximumPrice || ''}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minSpace">Min Space</Label>
              <Input
                type="number"
                placeholder="Min Sq. Meters"
                name="minSqm"
                onChange={handleChange}
                value={minimumSqm || ''}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Search</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default FiltersComponent;
