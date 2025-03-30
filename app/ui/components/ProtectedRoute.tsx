import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserRole, selectIsAuthenticated } from "@/app/store/auth";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userRole = useSelector(selectUserRole);

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(userRole)) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
