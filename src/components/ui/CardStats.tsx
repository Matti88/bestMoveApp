import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card"
import { Label } from "@/components/ui/shadcn/label"

type CardDataPropops = {
  title: string,
  count: number,
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
    <Card className="w-full p-1">
      <CardHeader className="p-2">
        <CardTitle className="text-sm">{title}</CardTitle>
        <CardDescription className="text-xs">{count} results</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-0 p-2">
        <div className="grid grid-cols-[auto_min-content_auto] gap-1 items-center">
          <div className="mr-2">
            <h3 className="text-sm font-semibold">Prices</h3>
            <div className="flex justify-between items-center mb-0.5">
              <Label className="text-xs">Min</Label>
              <p className="text-xs">{minPrice.toLocaleString('de-DE')}</p>
            </div>
            <div className="flex justify-between items-center mb-0.5">
              <Label className="text-xs">Median</Label>
              <p className="text-xs">{medianPrice.toLocaleString('de-DE')}</p>
            </div>
            <div className="flex justify-between items-center">
              <Label className="text-xs">Max</Label>
              <p className="text-xs">{maxPrice.toLocaleString('de-DE')}</p>
            </div>
          </div>

          {/* Vertical bar as a separator */}
          <div className="flex justify-center">
            <div className="h-full w-px bg-gray-300"></div>
          </div>

          <div className="ml-2">
            <h3 className="text-sm font-semibold">Areas</h3>
            <div className="flex justify-between items-center mb-0.5">
              <Label className="text-xs">Min</Label>
              <p className="text-xs">{min.toLocaleString('de-DE')}</p>
            </div>
            <div className="flex justify-between items-center mb-0.5">
              <Label className="text-xs">Median</Label>
              <p className="text-xs">{median.toLocaleString('de-DE')}</p>
            </div>
            <div className="flex justify-between items-center">
              <Label className="text-xs">Max</Label>
              <p className="text-xs">{max.toLocaleString('de-DE')}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CardStats;
