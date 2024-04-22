import { createHashRouter } from "react-router-dom";

import { Applayout } from "./components/layouts/AppLayout";
import { SideLayout } from "./components/layouts/SideLayout";

import NoMatch from "./pages/NoMatch";
import Dashboard from "./pages/Dashboard";
import Empty from "./pages/Empty";
import Topnav from "./pages/Topnav";
import Sidenav from "./pages/Sidenav";
import Forms from "./pages/Forms";
import Houses from "./pages/Houses";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Widgets from "./pages/Widgets";
import Components from "./pages/Components";
import ZDatabaseEntry from "./pages/ZDatabaseEntry";
import Mapwork from "./pages/Mapwork";
import Settings from "./pages/Settings";


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
                path: "database",
                element: <ZDatabaseEntry />,
            },
            {
                path: "settings",
                element: <Settings />,
            }, 
            {
                path: "",
                element: <Dashboard />,
            },
        ],
    },
    {
        path: "/layout/sidenav",
        element: <SideLayout />,
        children: [
            {
                path: "",
                element: <Sidenav />,
            },
        ],
    },
    {
        path: "*",
        element: <NoMatch />,
    },
])
