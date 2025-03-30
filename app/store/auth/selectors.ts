// ./app/store/auth/selectors.ts
import { AppState } from "@/app/store/types";

export const selectAccessToken = (state: AppState) => state.auth.token;
export const selectIsAuthenticated = (state: AppState) => !!state.auth.token;
export const selectUserRole = (state: AppState) => state.auth.role;
