// ./app/ui/components/ProtectedRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated, selectUserRole } from "@/app/store/auth";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userRole = useSelector(selectUserRole);

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!userRole || !allowedRoles.includes(userRole)) return <Navigate to="/not-found" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
