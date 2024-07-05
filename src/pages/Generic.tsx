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

import { Badge } from "@/components/ui/shadcn/badge"
import { Button } from "@/components/ui/shadcn/button"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/shadcn/drawer"
import { Input } from "@/components/ui/shadcn/input"
import { Label } from "@/components/ui/shadcn/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/shadcn/select"
import { Textarea } from "@/components/ui/shadcn/textarea"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/shadcn/tooltip"
import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { PoisLeft } from "@/components/pois-left";
import { FiltersRight } from "@/components/filters-right";

export default function Generic() {
    return (
        <>
            <PageHeader>
                <PageHeaderHeading>Settings</PageHeaderHeading>
            </PageHeader>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                <div className="md:col-span-3 flex justify-center">
                    <PoisLeft />
                </div>
                <div className="md:col-span-3 flex justify-center">
                    <FiltersRight />
                </div>
            </div>
        </>
    )
}
