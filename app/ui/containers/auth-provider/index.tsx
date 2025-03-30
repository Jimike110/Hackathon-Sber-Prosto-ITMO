// ./app/ui/containers/auth-provider.tsx
import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { selectIsAuthenticated, selectUserRole } from "@/app/store/auth";

interface Props {
  readonly children: React.ReactNode;
}

const publicRoutes = ['/register', '/login'];

export const AuthProvider = ({ children }: Props) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userRole = useSelector(selectUserRole);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isPublicRoute = publicRoutes.includes(location.pathname);
    if (!isAuthenticated && !isPublicRoute) {
      navigate("/login", { replace: true });
    }
    // When authenticated, if userRole is set, you may redirect based on role:
    if (isAuthenticated && userRole) {
      // Example: if user role is admin, ensure they go to /admin dashboard.
      // Adjust these conditions based on your routing logic.
      if (userRole === "admin" && !location.pathname.startsWith("/admin")) {
        navigate("/admin", { replace: true });
      } else if (userRole === "worker" && !location.pathname.startsWith("/worker")) {
        navigate("/worker", { replace: true });
      } else if (userRole === "guest" && !location.pathname.startsWith("/guest")) {
        navigate("/guest", { replace: true });
      }
    }
  }, [isAuthenticated, userRole, location.pathname, navigate]);

  return <>{children}</>;
};
