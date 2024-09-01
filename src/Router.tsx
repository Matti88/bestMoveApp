import { createHashRouter } from "react-router-dom";

import { Applayout } from "./components/layouts/AppLayout";
import Houses from "./pages/Houses"; 
import CommunityUpdated from "./pages/CommunityDatabases";
import Landing from "./pages/Landing";
import Mapwork from "./pages/Mapwork";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfSerivice from "./pages/TermsOfSerivice";


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
                path: "privacy-policy",
                element: <PrivacyPolicy />,
            },
            {
                path: "tos",
                element: <TermsOfSerivice />,
            },
            {
                path: "/",
                element: <Landing />,
            },
        ],
    }
])
