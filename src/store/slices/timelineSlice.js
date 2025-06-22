import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient, API_ENDPOINTS } from "../api/apiConfig";

// Async thunk for fetching timeline
export const fetchTimeline = createAsyncThunk(
  "timeline/fetchTimeline",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.TIMELINE_GET_ALL);
      return response.data.timelines;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch timeline",
      );
    }
  },
);

const initialState = {
  timeline: [],
  loading: false,
  error: null,
};

const timelineSlice = createSlice({
  name: "timeline",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTimeline.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTimeline.fulfilled, (state, action) => {
        state.loading = false;
        state.timeline = action.payload;
        state.error = null;
      })
      .addCase(fetchTimeline.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = timelineSlice.actions;
export default timelineSlice.reducer;
