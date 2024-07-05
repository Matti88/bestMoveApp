import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Applayout() {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex-grow relative">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}
