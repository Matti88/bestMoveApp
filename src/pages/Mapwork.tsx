import MapComponent from '@/components/ui/MapComponent2';
import FiltersComponent from '@/components/ui/FiltersComponent';
import FormComponent from "@/components/ui/FormComponent";
import POIList from "@/components/ui/POIList";
import FiltersComponentSmallScreen from '@/components/ui/FiltersComponentSmallScreen';
import FormComponentSmallScreen from '@/components/ui/FormComponentSmallScreen';
import ChipList from '@/components/ui/ChipsList';

export default function Mapwork() {


  return (
    <>
      <div className="relative w-full h-full">
        <div className="absolute inset-0 z-0">
          <MapComponent />
          <POIList />
        </div>

        <div className="absolute top-10 left-10 z-10 p-2 rounded max-w-md h-[80vh] w-[20vw] overflow-y-auto scaled-container hidden md:block">
          <FormComponent />
        </div>

        <div className="absolute top-10 right-10 z-10 p-2 rounded max-w-md h-[80vh] w-[20vw] overflow-y-auto scaled-container hidden md:block">
          <FiltersComponent />
          <br />
        </div>
        <div className="absolute top-5 right-5 z-10 md:hidden">
          <FiltersComponentSmallScreen />
        </div>
        <div className="flex items-center justify-center">
          <div className="absolute bottom-5 z-10 md:hidden">
            <FormComponentSmallScreen />
          </div>
        </div>
        <div className="absolute top-5 left-5 z-10 p-2 md:hidden">
          <ChipList />
        </div>
      </div>
    </>
  );
}
