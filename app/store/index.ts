// app/store/index.ts
import {configureStore, ThunkDispatch, UnknownAction, combineReducers} from '@reduxjs/toolkit'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {authSlice} from "./auth";
import {userSlice} from "./user";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'] // Only persist auth state
}

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  user: userSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>
export type AppStore = typeof store

export { store }