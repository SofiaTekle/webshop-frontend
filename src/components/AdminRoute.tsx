import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "../service/authService";

const AdminRoute = () => {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.roles.includes("ROLE_ADMIN")) {
    return <Navigate to="/products" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
