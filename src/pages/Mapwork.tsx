import MapComponent from "@/components/ui/MapComponent";
import FiltersComponent from '@/components/ui/FiltersComponent';
import HouseListing from "@/components/ui/HouseListing";
import houselistingStore from '@/store/houselistingStore';
import FormComponent from "@/components/ui/FormComponent";
import POIList from "@/components/ui/POIList";

export default function Mapwork() {
  const houses = houselistingStore((state) => state.houseListings);

  return (
    <>
      <div className="relative w-full h-screen">
        <div className="absolute inset-0 z-0">
          <MapComponent />
        </div>
        <div className="absolute top-10 left-20 z-10 p-4 rounded  max-w-xs">
          <FormComponent />
          <br/>
          <POIList />
        </div>
        <div className="absolute top-10 right-20 z-10 p-4 rounded max-w-md h-[80vh] overflow-y-auto">
          <FiltersComponent />
          <br/>
          {houses.filter((house) => house.displayed).map((listing, index) => (
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
    </>
  );
}
