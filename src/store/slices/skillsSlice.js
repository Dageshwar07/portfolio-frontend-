import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient, API_ENDPOINTS } from "../api/apiConfig";

// Async thunk for fetching skills
export const fetchSkills = createAsyncThunk(
  "skills/fetchSkills",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.SKILLS_GET_ALL);
      return response.data.skills;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch skills",
      );
    }
  },
);

const initialState = {
  skills: [],
  loading: false,
  error: null,
};

const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.skills = action.payload;
        state.error = null;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = skillsSlice.actions;
export default skillsSlice.reducer;
