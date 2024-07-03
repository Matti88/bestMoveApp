import { Card } from "@/components/ui/card"
import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { PoisLeft } from "@/components/pois-left";
import { FiltersRight } from "@/components/filters-right";
import MapComponent from "@/components/ui/mapComponent";


export default function Mapwork() {
  return (
    <>
<div className="flex flex-col items-center mt-10 mb-10 gap-20 md:col-span-12">
  
    <div className="flex flex-row gap-4"> {/* Changed flex-col to flex-row and added gap */}
      <PoisLeft />
      <FiltersRight />
    </div>
  
</div>

      
        <div className="md:col-span-4 flex justify-center">
          <div className="w-full h-full">
            <MapComponent />
          </div>
        </div>

    </>
  )
}
