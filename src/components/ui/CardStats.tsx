import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card"
import { Label } from "@/components/ui/shadcn/label"


type CardDataPropops = {
  title: string,
  count: number,
  //average: number,
  medianPrice: number,
  maxPrice: number,
  minPrice: number,
  median: number,
  max: number,
  min: number,

}


const CardStats: React.FC<CardDataPropops> = ({
  title,
  count,
  median,
  max,
  min,
  medianPrice,
  maxPrice,
  minPrice

}) => {

  return (
    <>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>With {count} results...</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-0">
          <div className="grid grid-cols-2 gap-1 ">
            <div className="mr-2">
              <h3>Prices</h3>
              <div className="flex justify-between items-center mb-1">
                <Label>Min</Label>
                <p className="text-sm">{minPrice}</p>
              </div>
              <div className="flex justify-between items-center mb-1">
                <Label>Median</Label>
                <p className="text-sm">{medianPrice}</p>
              </div>
              <div className="flex justify-between items-center">
                <Label>Max</Label>
                <p className="text-sm">{maxPrice}</p>
              </div>
            </div>
            <div className="ml-2">
              <h3>Areas</h3>
              <div className="flex justify-between items-center mb-1">
                <Label>Min</Label>
                <p className="text-sm">{min}</p>
              </div>
              <div className="flex justify-between items-center mb-1">
                <Label>Median</Label>
                <p className="text-sm">{median}</p>
              </div>
              <div className="flex justify-between items-center">
                <Label>Max</Label>
                <p className="text-sm">{max}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>


    </>
  )
}

export default CardStats;

