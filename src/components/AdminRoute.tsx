import { Navigate, Outlet } from "react-router-dom";
import type { CurrentUser } from "../types/auth.ts";

type AdminRouteProps = {
  currentUser: CurrentUser | null;
};

const AdminRoute = ({ currentUser }: AdminRouteProps) => {
  if (currentUser === null) {
    return <Navigate to="/login" replace />;
  }

  if (!currentUser.roles.includes("ROLE_ADMIN")) {
    return <Navigate to="/products" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
