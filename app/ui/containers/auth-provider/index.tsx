import {type ReactNode, useEffect} from 'react';
import {useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {selectIsAuthenticated} from "@/app/store/auth";

interface Props {
  readonly children: ReactNode;
}

const publicRoutes = ['/register', '/login'];

export const AuthProvider = ({ children }: Props) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isPublicRoute = publicRoutes.includes(location.pathname);

    if (!isAuthenticated && !isPublicRoute) {
      navigate("/register");
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return <>{children}</>;
}; 