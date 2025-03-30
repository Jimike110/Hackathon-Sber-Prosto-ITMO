// ./app/hooks/useUsers.ts
import { useMutation } from '@tanstack/react-query';
import { useAppDispatch } from '@/app/store/hooks';
import { loginSuccess, fetchUserRole } from '@/app/store/auth';

interface AuthCredentials {
  email: string;
  password: string;
}

export const useUsers = () => {
  const dispatch = useAppDispatch();

  const loginUser = useMutation({
    mutationFn: async (credentials: AuthCredentials) => {
      const response = await fetch('http://localhost:5000/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      // Dispatch login success action with the received token
      dispatch(loginSuccess({ token: data.access_token }));
      console.log("Access token received:", data.access_token);
      // Fetch and store the user's role
      dispatch(fetchUserRole(data.access_token));
      return data;
    },
  });

  const registerUser = useMutation({
    mutationFn: async (credentials: AuthCredentials) => {
      // Uncomment and update the following code to use your actual API
      // const response = await fetch('/register', { ... });
      // if (!response.ok) throw new Error('Registration failed');
      // return response.json();
      
      // For now, return fake data:
      return {
        access_token: "fake_token",
      };
    },
    onSuccess: (data) => {
      // Optionally, dispatch further actions here if needed.
    }
  });

  return { loginUser, registerUser };
};
