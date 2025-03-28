import {DefaultError, useMutation} from '@tanstack/react-query';
import {SuccessfulAuth} from "@/app/types";
import {setAccessToken} from "@/app/store/auth";
import {useAppDispatch} from "@/app/store/hooks";

interface AuthCredentials {
  email: string;
  password: string;
}

export const useUsers = () => {
  const dispatch = useAppDispatch()

  const loginUser = useMutation<SuccessfulAuth, DefaultError, AuthCredentials>({
    mutationFn: async (credentials: AuthCredentials) => {
      // const response = await axios.post(`${BASE_URL}${API_Endpoints.USERS_LOGIN}`, credentials);
      // return response.data;
      return {
        access_token: "fake_token",
      } as SuccessfulAuth
    },
    onSuccess: (data) => {
      dispatch(setAccessToken(data.access_token));
    }
  });

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
