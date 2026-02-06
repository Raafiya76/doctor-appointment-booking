// Redux Toolkit Imports
import { createSlice } from "@reduxjs/toolkit";
// Custom Imports
import { RootState } from "./store";

const alertSlice = createSlice({
  name: "alerts",
  initialState: {
    loading: false,
  },

  reducers: {
    showLoading(state) {
      state.loading = true;
    },
    hideLoading(state) {
      state.loading = false;
    },
  },
});

export const { showLoading, hideLoading } = alertSlice.actions;
export default alertSlice.reducer;

export const alertsLoader = (state: RootState) => state.alerts.loading;
