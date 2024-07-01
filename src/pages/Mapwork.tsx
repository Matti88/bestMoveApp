import { Card } from "@/components/ui/card"
import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { PoisLeft } from "@/components/pois-left";
import { FiltersRight } from "@/components/filters-right";
import MapComponent from "@/components/ui/MapComponent";


export default function Mapwork() {
  return (
    <>
      <div className="flex flex-col items-center mt-10 mb-10 gap-10 md:col-span-8">
        <Card className="w-full mx-auto  gap-10 px-10">
        <div className="flex-col">
            <PoisLeft />
            <FiltersRight />
        </div>
        </Card>
      </div>
      
        <div className="md:col-span-4 flex justify-center">
          <div className="w-full h-full">
            <MapComponent />
          </div>
        </div>

    </>
  )
}
