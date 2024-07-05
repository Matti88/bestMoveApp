import { createHashRouter } from "react-router-dom";

import { Applayout } from "./components/layouts/AppLayout";
import Houses from "./pages/Houses"; 
import Mapwork from "./pages/Mapwork";


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
