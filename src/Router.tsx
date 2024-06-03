import { createHashRouter } from "react-router-dom";

import { Applayout } from "./components/layouts/AppLayout";
import Houses from "./pages/Houses"; 
import ZDatabaseEntry from "./pages/ZDatabaseEntry";
import Mapwork from "./pages/Mapwork";
import Settings from "./pages/Settings";
import Generic from "./pages/Generic";


// createBrowserRouter
export const router = createHashRouter([
    {
        path: "/",
        element: <Applayout />,
        children: [
            {
                path: "mapwork",
                element: <Mapwork />,
            },
            {
                path: "/",
                element: <Mapwork />,
            },
            {
                path: "houses",
                element: <Houses />,
            },
            {
                path: "database",
                element: <ZDatabaseEntry />,
            },
            {
                path: "settings",
                element: <Settings />,
            },
            {
                path: "generic",
                element: <Generic />,
            },
            {
                path: "database/:id",
                element: <ZDatabaseEntry />,
            },
        ],
    }
])
