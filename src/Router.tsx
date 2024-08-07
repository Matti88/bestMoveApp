import { createHashRouter } from "react-router-dom";

import { Applayout } from "./components/layouts/AppLayout";
import Houses from "./pages/Houses"; 
import Mapwork from "./pages/Mapwork";
import CommunityUpdated from "./pages/CommunityDatabases";
import Landing from "./pages/Landing";



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
                path: "houses",
                element: <Houses />,
            },
            {
                path: "communutyupdated",
                element: <CommunityUpdated />,
            },
            {
                path: "/",
                element: <Landing />,
            },
            // {
            //     path: "database",
            //     element: <Database />,
            // }, 
            // {
            //     path: "database/:id",
            //     element: <Database />,
            // },
        ],
    }
])
