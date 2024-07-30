import * as React from "react"
import POIList from '@/components/ui/POIList';
import { userSearchStore } from '@/store/user-search';
import { Label } from "@/components/ui/shadcn/label";
import ChipArray from '@/components/ui/ChipArray';
import { Button } from "@/components/ui/shadcn/button";

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
import POICard from '@/components/ui/POICard';


export function PoiManager() {
  
  const { pois, deletePOI, toggleDangerZone } = userSearchStore();

  return (
    <Drawer fullHeight={true}>
      <DrawerTrigger asChild>
        <Button className="w-full h-5 m-1" variant="ghost">Manage Pois</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-[90vw] p-4 max-h-[90vh] flex flex-col">
          <DrawerHeader>
            <DrawerTitle>Point of Interest</DrawerTitle>
            <DrawerDescription>List of POIs, change or delete them</DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-wrap overflow-y-auto">
            {pois.length > 0 ? (
              pois.map((poi) => (
                <div className="m-4" key={poi.id}>
                  <POICard
                    key={poi.id}
                    address={poi.address}
                    modeOfTransportation={poi.modeOfTransportation}
                    timeRange={poi.timeRange}
                    title={poi.title}
                    customId={poi.id}
                    dangerZone={poi.dangerZone}
                    onDelete={() => deletePOI(poi.id)}
                    onToggleDangerZone={() => toggleDangerZone(poi.id)}
                  />
                </div>
              ))
            ) : (
              <p>No points of interest available.</p>
            )}
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Back</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
