// Redux Toolkit Imports
import { configureStore } from "@reduxjs/toolkit";
// Custom Imports
import authReducer from "./auth/authSlice";
import alertReducer from "./alertSlice";
import { apiSlice } from "./api/apiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,

    auth: authReducer,
    alerts: alertReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
