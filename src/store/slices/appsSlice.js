import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient, API_ENDPOINTS } from "../api/apiConfig";

// Async thunk for fetching apps
export const fetchApps = createAsyncThunk(
  "apps/fetchApps",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.APPS_GET_ALL);
      return response.data.softwareApplications;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch apps",
      );
    }
  },
);

const initialState = {
  apps: [],
  loading: false,
  error: null,
};

const appsSlice = createSlice({
  name: "apps",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApps.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApps.fulfilled, (state, action) => {
        state.loading = false;
        state.apps = action.payload;
        state.error = null;
      })
      .addCase(fetchApps.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = appsSlice.actions;
export default appsSlice.reducer;
