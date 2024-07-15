import MapComponent from '@/components/ui/MapComponent2';
import FiltersComponent from '@/components/ui/FiltersComponent';
import HouseListing from "@/components/ui/HouseListing";
import houselistingStore from '@/store/houselistingStore';
import FormComponent from "@/components/ui/FormComponent";
import POIList from "@/components/ui/POIList";

export default function Mapwork() {
  const houses = houselistingStore((state) => state.houseListings);

  return (
    <>
      <div className="relative w-full h-full">
        <div className="absolute inset-0 z-0">
          <MapComponent />
        </div>
        <div className="absolute top-10 left-10 z-10 p-2 rounded max-w-md h-[80vh] w-[20vw] overflow-y-auto scaled-container">
          <FormComponent />
          <br/>
          <POIList />
        </div>
        <div className="absolute top-10 right-10 z-10 p-2 rounded max-w-md h-[80vh] w-[20vw] overflow-y-auto scaled-container">
          <FiltersComponent />
          <br/>
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
      </div>
    </>
  );
}
