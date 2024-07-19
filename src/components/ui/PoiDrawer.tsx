import * as React from "react"
import { TargetIcon } from "@radix-ui/react-icons"
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
 
export function PoiDrawer() {
  const [goal, setGoal] = React.useState(350)

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)))
  }

  return (
    <Drawer fullHeight={true}>
    <DrawerTrigger asChild>
      <Button className="pr-7 pl-7 pt-3 pb-3" variant="secondary">
        <TargetIcon />
      </Button>
    </DrawerTrigger>
    <DrawerContent>
      <div className="mx-auto w-full max-w-sm p-4 h-screen flex flex-col">
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
