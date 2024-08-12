import { Navigate, useLocation } from "react-router-dom";
import Mapwork from "./Mapwork";
import useAuthStore from '@/store/userLogin'; // Adjust the path as needed

const MapworkRoute = () => {
  const location = useLocation();
  const { isLoggedIn } = useAuthStore();

  if (!isLoggedIn()) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Mapwork />;
};

export default MapworkRoute;