import { useState } from 'react';
import MapComponent from '@/components/ui/MapComponent2';
import FiltersComponent from '@/components/ui/FiltersComponent';
import FormComponent from "@/components/ui/FormComponent";
import FiltersComponentSmallScreen from '@/components/ui/FiltersComponentSmallScreen';
import FormComponentSmallScreen from '@/components/ui/FormComponentSmallScreen';
import CardStats from '@/components/ui/CardStats';
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
import { PoiDrawer } from '@/components/ui/PoiDrawer';

import { userSearchStore } from '@/store/user-search';
import { houselistingStore } from '@/store/houselistingStore';



export default function Mapwork() {
  const [isVisible, setIsVisible] = useState(true);

  // Retrieve the statistics from the store
  const searchStats = userSearchStore((state) => state.activeFilters.searchStats);
  const activeFilters = userSearchStore((state) => state.activeFilters);
  const houseListings = houselistingStore((state) => state.houseListings);


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

            <div className="absolute top-10 right-10 z-10 p-2 rounded max-w-md h-[55vh] w-[20vw]  scaled-container hidden md:block">
              <FiltersComponent />
              <br />
              {houseListings.map(house => (house.displayed == true)).length>0 ? 
                <CardStats 
                  title="Search Stats" 
                  count={searchStats.count} 
                  median={searchStats.medianSqm} 
                  max={searchStats.maxSqm} 
                  min={searchStats.minSqm} 
                  medianPrice={searchStats.medianPrice} 
                  maxPrice={searchStats.maxPrice} 
                  minPrice={searchStats.minPrice} 
                />
              : null}
            </div>
          </>
        )}

        <div className="absolute top-3  z-10 p-2 w-[100vw]  md:hidden">
          <div className="flex flex-col">
            <div className=''>
              <PoiDrawer />
            </div>
            <div className="flex rounded-full justify-end mt-3">
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
