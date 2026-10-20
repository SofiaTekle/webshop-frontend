import { Navigate, Outlet } from "react-router-dom";
import type { CurrentUser } from "../types/auth";

type ProtectedRouteProps = {
  currentUser: CurrentUser | null;
}

const ProtectedRoute = ({currentUser}: ProtectedRouteProps) => {
  if (currentUser === null) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};
export default ProtectedRoute;
