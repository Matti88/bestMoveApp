import { appConfig } from "@/config/app";
import { ModeToggle } from "../mode-toggle";
import { PoiDrawer } from '@/components/ui/PoiDrawer';
import  FormComponentFooter  from '@/components/ui/FormComponentFooter';

export function Footer() {
    return (
        <footer className="flex flex-col items-center justify-between gap-4 min-h-[3rem] md:h-20 py-2 md:flex-row ml-20 mr-20" >
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left hidden md:block">Built by <a href={appConfig.author.url} target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">{appConfig.author.name}</a>.</p>
            <div className="hidden md:block">
                <ModeToggle />
            </div>
            <div className="flex flex-row items-center gap-4 sm:hidden">
                <FormComponentFooter />
                <PoiDrawer />
            </div>
        </footer>
    )
}