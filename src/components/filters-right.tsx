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
import HouseListing from "@/components/ui/HouseListing";
import houselistingStore from '@/store/houselistingStore';
import FiltersComponent from '@/components/ui/FiltersComponent'


export function FiltersRight() {

  const houses = houselistingStore((state) => state.houseListings);

  return (
    <>
    <div className="grid grid-cols-2 gap-2">
      <Sheet key='right'>
        <SheetTrigger asChild>
          <Button variant="outline">Filters</Button>
        </SheetTrigger>
        <SheetContent side='right'>
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>
              Apply filters for your search
            </SheetDescription>
          </SheetHeader>

          <FiltersComponent></FiltersComponent> 

          <div className={`shadow-md p-4 mb-4 max-w-md mx-auto overflow-y-auto bg-white rounded bg-gray-800 text-black`}>
                <h2 className="border-b pb-2">House Listings</h2>
                <div className="overflow-y-auto">
                  {houses.map((listing, index) => (
                    <HouseListing
                      key={index}
                      image={listing.image}
                      title={listing.title}
                      price={listing.price}
                      sqm={listing.sqm}
                      listingUrl={listing.image}
                    />
                  ))}
                </div>
              </div>
          <SheetFooter>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
    </>
  )
}

