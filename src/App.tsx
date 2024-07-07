import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { router } from "./Router"; 
import 'mapbox-gl/dist/mapbox-gl.css';

export default function App() {
    return (

        <ThemeProvider>
            <RouterProvider router={router} />
        </ThemeProvider>

    )
}
