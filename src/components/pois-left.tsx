
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import FormComponent from "@/components/ui/FormComponent"
import POIList from "@/components/ui/POIList"
 
export  function PoisLeft() {
  return (
    <div className="grid grid-cols-2 gap-2">
 
        <Sheet key='left'>
          <SheetTrigger asChild>
            <Button variant="outline">Point of Interests</Button>
          </SheetTrigger>
          <SheetContent side='left'>
            <SheetHeader>
              <SheetTitle>Point Of Interest</SheetTitle>
              <SheetDescription>
                Add and remove points of interest 
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <FormComponent></FormComponent>
              <POIList></POIList>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
    </div>
  )
}

