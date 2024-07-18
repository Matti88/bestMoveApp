import { Button } from "@/components/ui/shadcn/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn/tabs";
import houselistingStore from '@/store/houselistingStore';
import TableComponent from '@/components/ui/TableComponent'
import HouseListing from "@/components/ui/HouseListing";




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
              <div className="ml-auto flex items-center gap-20 hidden sm:block">
                <Button className="h-8 gap-1" size="sm" variant="outline" onClick={() => exportToSpreadsheet(houses.filter((house) => house.displayed), "Search_Export")}>
                  <ArrowUpIcon className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export results of filtered houses</span>
                </Button>
                <Button className="h-8 gap-1" size="sm" variant="outline" onClick={() => updateHouseListings([])}>
                  <ResetIcon className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Reset Houses</span>
                </Button>
              </div>
            </div>
          </div>
          <TabsContent value="all">
            <div className="hidden sm:block">
              <TableComponent houses={houses}></TableComponent>
            </div>
            <div >
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

function ArrowUpIcon(props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-8" />
      <path d="M8 12l4-4 4 4" />
    </svg>
  );
}

function ResetIcon(props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      height="21"
      viewBox="0 0 21 21"
      width="21">
      <g fill="none"
        fillRule="evenodd"
        stroke="#2a2e3b"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="matrix(-1 0 0 1 20 2)">
        <path d="m5.5 1.5c-2.4138473 1.37729434-4 4.02194088-4 7 0 4.418278 3.581722 8 8 8s8-3.581722 8-8-3.581722-8-8-8" />
        <path d="m5.5 1.5v5h-5" transform="matrix(1 0 0 -1 0 8)" />
      </g>
    </svg>
  );
}

export default TabsComponent;
