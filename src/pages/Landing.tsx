import Steps from "@/components/landing/Steps";
import HeroTop from "@/components/landing/HeroTop";
import Faq from "@/components/landing/Faq";
import Video from "@/components/landing/Video";

export default function Landing() {
    return (
        <div className="bg-background text-foreground flex-grow flex items-center justify-center">
            <div className="space-y-4">
                <HeroTop />
                <Steps />
                <Video />
                <Faq />
            </div>
        </div>
    )
}
