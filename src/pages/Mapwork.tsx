import MapComponent from '@/components/ui/MapComponent2';
import FiltersComponent from '@/components/ui/FiltersComponent';
import FormComponent from "@/components/ui/FormComponent";
import POIList from "@/components/ui/POIList"; 

export default function Mapwork() {


  return (
    <>
      <div className="relative w-full h-full">
        <div className="absolute inset-0 z-0">
          <MapComponent />
        </div>
        <div className="absolute top-10 left-10 z-10 p-2 rounded max-w-md h-[80vh] w-[20vw] overflow-y-auto scaled-container hidden sm:block">
          <FormComponent />
          <br/>
          <POIList />
        </div>

        <div className="absolute top-10 right-10 z-10 p-2 rounded max-w-md h-[80vh] w-[20vw] overflow-y-auto scaled-container hidden sm:block">
          <FiltersComponent />
          <br/>
        </div>
      </div>
    </>
  );
}
