import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/shadcn/carousel"
import {CardData} from "@/components/ui/CardData"


export default function CommunityUpdated() {

  return (
    <>
      <div className="container mx-50 ">
        <div className="flex flex-row mt-10">
        <Carousel
              opts={{
                align: "start",
              }}
              className="w-full max-w-sm"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            <CarouselItem className="pl-2 md:pl-4">
              <CardData/>
              </CarouselItem>
            <CarouselItem className="pl-2 md:pl-4">
              <CardData/>
              </CarouselItem>
            <CarouselItem className="pl-2 md:pl-4">
              <CardData/>
              </CarouselItem>
          </CarouselContent>
        </Carousel>
        </div>
      </div>
    </>
  );
}
