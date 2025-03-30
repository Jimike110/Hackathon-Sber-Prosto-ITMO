// ./app/store/auth/slice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch user role from the backend using the JWT.
export const fetchUserRole = createAsyncThunk(
  "auth/fetchUserRole",
  async (token: string, { rejectWithValue }) => {
    try {
      console.log(token);
      const response = await fetch("http://localhost:5000/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        console.log("error")
        throw new Error("Failed to fetch user details");
      }
      const user = await response.json();
      return user.role; // Expecting role from backend
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Create the auth slice and export it as a named export
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    token: null as string | null,
    role: null as string | null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.role = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserRole.fulfilled, (state, action) => {
      state.role = action.payload;
    });
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
