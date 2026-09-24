import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../service/authService";

const ProtectedRoute = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};
export default ProtectedRoute;
