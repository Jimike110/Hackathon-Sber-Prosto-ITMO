// app/store/auth/slice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch user role after login
export const fetchUserRole = createAsyncThunk(
  "auth/fetchUserRole",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await fetch("/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch user details");

      const user = await response.json();
      return user.role; // Expecting role from backend
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    token: null,
    role: null,
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
// export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUserRole = (state) => state.auth.role;
export default authSlice;
