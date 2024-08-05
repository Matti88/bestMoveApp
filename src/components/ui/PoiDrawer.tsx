import * as React from "react"
import POIList from '@/components/ui/POIList';
import { userSearchStore } from '@/store/user-search';
import ChipArray from '@/components/ui/ChipArray';
import { Button } from "@/components/ui/shadcn/button";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";


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

export function PoiDrawer() {
  const [goal, setGoal] = React.useState(350)
  const activeFilters = userSearchStore((state) => state.activeFilters);
  const list_selectionPoi = activeFilters.selectedPoiIds;

  return (
    <Drawer fullHeight={true}>
      <DrawerTrigger asChild>
      <div className="flex items-center justify-between p-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)' }} id="listofpois">
      <div className="flex flex-wrap flex-grow rounded-md">
        {list_selectionPoi.length > 0 && (
          <>
            <div className="flex flex-wrap m-2">
              {list_selectionPoi.map((chip) => (
                <ChipArray
                  key={chip.id}
                  id={chip.id}
                  text={chip.text}
                  poiColor={chip.poiColor}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="flex items-center justify-center w-16">
        <MdOutlineKeyboardArrowRight className="w-10 h-10" />
      </div>
    </div>

      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm p-4 max-h-[90vh] flex flex-col">
          <DrawerHeader>
            <DrawerTitle>Point of Interest</DrawerTitle>
            <DrawerDescription>List of POIs, change or delete them</DrawerDescription>
          </DrawerHeader>
          <div className="flex-grow overflow-y-auto">
            <POIList />
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
