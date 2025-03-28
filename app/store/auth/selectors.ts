import {AppState} from "@/app/store/types";

export const selectAccessToken = (state: AppState) => state.auth.accessToken
export const selectIsAuthenticated = (state: AppState) => !!state.auth.accessToken