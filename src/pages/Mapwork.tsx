import {
  Bird,
  Book,
  Bot,
  Code2,
  CornerDownLeft,
  LifeBuoy,
  Mic,
  Paperclip,
  Rabbit,
  Settings,
  Settings2,
  Share,
  // SquareTerminal,
  // SquareUser,
  Triangle,
  Turtle,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { PoisLeft } from "@/components/pois-left";
import { FiltersRight } from "@/components/filters-right";
import MapComponent  from "@/components/ui/mapComponent";


export default function Mapwork() {
  return (
      <>
          <PageHeader>
              <PageHeaderHeading>Mapwork</PageHeaderHeading>
          </PageHeader>
          <div className="grid grid-cols-5 md:grid-cols-6 gap-6">
              <div className="md:col-span-1 flex justify-center">
                  <PoisLeft />
              </div>
              <div className="md:col-span-4 flex justify-center">
              <MapComponent/>
              </div>
              <div className="md:col-span-1 flex justify-center">
                  <FiltersRight />
              </div>
          </div>

      </>
  )
}
