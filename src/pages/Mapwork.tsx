import { useState } from 'react';
import MapComponent from '@/components/ui/MapComponent2';
import FiltersComponent from '@/components/ui/FiltersComponent';
import FormComponent from "@/components/ui/FormComponent";
import FiltersComponentSmallScreen from '@/components/ui/FiltersComponentSmallScreen';
import FormComponentSmallScreen from '@/components/ui/FormComponentSmallScreen';
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
import { PoiDrawer } from '@/components/ui/PoiDrawer';

export default function Mapwork() {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div className="relative w-full h-full">
        <div className="absolute inset-0 z-0">
          <MapComponent />
        </div>

        {isVisible && (
          <>
            <div className="absolute top-10 left-10 z-10 p-2 rounded max-w-md h-[80vh] w-[20vw] overflow-y-auto scaled-container hidden md:block">
              <FormComponent />
            </div>

            <div className="absolute top-10 right-10 z-10 p-2 rounded max-w-md h-[55vh] w-[20vw] overflow-y-auto scaled-container hidden md:block">
              <FiltersComponent />
              <br />
            </div>
          </>
        )}

        <div className="absolute top-3 left-5 z-10 p-2 w-[94vw] md:hidden">
          <div className="flex flex-col">
            <div>
              <PoiDrawer />
            </div>
            <div className="flex justify-end mt-3">
              <FiltersComponentSmallScreen />
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-7 z-10 w-full flex justify-center">
          <div className="w-[90%] md:hidden">
            <FormComponentSmallScreen />
          </div>
        </div>

        <div className="absolute bottom-7 right-12 z-10 hidden md:block">
          <button onClick={toggleVisibility} className="bg-white h-12 w-12 text-white rounded">
            {isVisible ? <MdFullscreen className='h-12 w-12 text-black' /> : <MdFullscreenExit className='h-12 w-12 text-black'/> }
          </button>
        </div>
      </div>
    </>
  );
}
