import { type ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { selectIsAuthenticated, selectUserRole } from "@/app/store/auth";

interface Props {
  readonly children: ReactNode;
}

const publicRoutes = ["/register", "/login"];

export const AuthProvider = ({ children }: Props) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userRole = useSelector(selectUserRole);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isPublicRoute = publicRoutes.includes(location.pathname);

    if (!isAuthenticated && !isPublicRoute) {
      navigate("/login");
    } else if (isAuthenticated && userRole) {
      // Redirect users based on role
      if (userRole === "admin") {
        navigate("/admin-dashboard");
      } else if (userRole === "worker") {
        navigate("/worker-dashboard");
      } else {
        navigate("/guest-home");
      }
    }
  }, [isAuthenticated, userRole, location.pathname, navigate]);

  return <>{children}</>;
};
