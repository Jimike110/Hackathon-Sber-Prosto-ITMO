// ./app/hooks/useLogout.ts
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@/app/store/auth";
import { persistor } from "@/app/store"; // if using redux-persist

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    // Clear persisted state if using redux-persist
    persistor.purge();
    // Dispatch the logout action to clear the Redux state
    dispatch(logout());
    // Optionally, clear any tokens stored in localStorage manually
    localStorage.removeItem("auth.accessToken");
    // Redirect the user to the login page
    navigate("/login", { replace: true });
  };

  return { logoutUser };
};
