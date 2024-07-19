import { Button } from "@/components/ui/shadcn/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn/tabs";
import houselistingStore from '@/store/houselistingStore';
import TableComponent from '@/components/ui/TableComponent'
import HouseListing from "@/components/ui/HouseListing";
import { ArrowUpIcon, ResetIcon } from "@/components/ui/icons/iconsCollection";



function TabsComponent() {


  const houses = houselistingStore((state) => state.houseListings);
  const filteredhouses = houselistingStore((state) => state.houseListings.filter(house => house.displayed));
  const updateHouseListings = houselistingStore((state) => state.updateHouseListings);
  const exportToSpreadsheet = houselistingStore((state) => state.exportToSpreadsheet);



  return (
    <div>
      <Button className="h-8 w-full gap-1 mb-2 sm:hidden"  variant="outline" onClick={() => exportToSpreadsheet(houses.filter((house) => house.displayed), "Search_Export")}>
        <ArrowUpIcon className="h-3.5 w-3.5" />
        <span >Export results of filtered houses</span>
      </Button>
      <div className="w-full">
        <Tabs defaultValue="all">
          <div className="grid grid-cols-2 gap-4">
            <div className="justify-self-start">
              <TabsList>
                <TabsTrigger value="all">All houses</TabsTrigger>
                <TabsTrigger value="filtered">Filtered Houses</TabsTrigger>
              </TabsList>
            </div>
            <div className="flex items-center gap-20">
              <div className="ml-auto flex items-center gap-20">
                <Button className="h-8 gap-1 hidden sm:block" size="sm" variant="outline" onClick={() => exportToSpreadsheet(houses.filter((house) => house.displayed), "Search_Export")}>
                  <ArrowUpIcon className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export results of filtered houses</span>
                </Button>
                <Button className="h-8 gap-1 hidden sm:block" size="sm" variant="outline" onClick={() => updateHouseListings([])}>
                  <ResetIcon className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Reset Houses</span>
                </Button>
                <Button className="h-8 gap-1 sm:hidden" size="sm" variant="outline" onClick={() => updateHouseListings([])}>
                  <ResetIcon className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
          <TabsContent value="all">
            <div className="hidden sm:block">
              <TableComponent houses={houses}></TableComponent>
            </div>
            <div  className="sm:hidden">
              {houses.map((listing, index) => (
                <HouseListing
                  key={index}
                  image={listing.image}
                  title={listing.title}
                  price={listing.price}
                  sqm={listing.sqm}
                  listingUrl={listing.link}
                />
              ))}
            </div>

          </TabsContent>
          <TabsContent value="filtered">
            <div className="hidden sm:block">
              <TableComponent houses={filteredhouses}></TableComponent>
            </div>
            <div >
              {houses.filter((house) => house.displayed).map((listing, index) => (
                <HouseListing
                  key={index}
                  image={listing.image}
                  title={listing.title}
                  price={listing.price}
                  sqm={listing.sqm}
                  listingUrl={listing.link}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}


export default TabsComponent;
