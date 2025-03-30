// app/hooks/useUsers.ts
import {DefaultError, useMutation} from '@tanstack/react-query';
import {SuccessfulAuth} from "@/app/types";
import { loginSuccess, fetchUserRole, } from "@/app/store/auth";
import {useAppDispatch} from "@/app/store/hooks";

interface AuthCredentials {
  email: string;
  password: string;
}

export const useUsers = () => {
  const dispatch = useAppDispatch()

  const loginUser = async (credentials) => {
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
  
      if (!response.ok) throw new Error("Login failed");
  
      const { access_token } = await response.json();
      dispatch(loginSuccess({ token: access_token }));
  
      // Fetch and store user role
      dispatch(fetchUserRole(access_token));
  
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const registerUser = useMutation<SuccessfulAuth, DefaultError, AuthCredentials>({
    mutationFn: async (credentials: AuthCredentials) => {
      // const response = await axios.post(`${BASE_URL}${API_Endpoints.USERS_REGISTER}`, credentials);
      // return response.data;
      return {
        access_token: "fake_token",
      } as SuccessfulAuth
    },
    onSuccess: (data) => {
      dispatch(setAccessToken(data.access_token));
    }
  });

  return { loginUser, registerUser };
};
