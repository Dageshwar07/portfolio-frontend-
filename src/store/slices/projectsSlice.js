import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient, API_ENDPOINTS } from "../api/apiConfig";

// Async thunk for fetching all projects
export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.PROJECTS_GET_ALL);
      return response.data.projects;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch projects",
      );
    }
  },
);

// Async thunk for fetching single project
export const fetchProjectById = createAsyncThunk(
  "projects/fetchProjectById",
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(
        API_ENDPOINTS.PROJECT_GET_BY_ID(projectId),
      );
      return response.data.project;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch project",
      );
    }
  },
);

const initialState = {
  projects: [],
  currentProject: null,
  loading: false,
  projectLoading: false,
  error: null,
  projectError: null,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.projectError = null;
    },
    clearCurrentProject: (state) => {
      state.currentProject = null;
      state.projectError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all projects
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
        state.error = null;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch single project
      .addCase(fetchProjectById.pending, (state) => {
        state.projectLoading = true;
        state.projectError = null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.projectLoading = false;
        state.currentProject = action.payload;
        state.projectError = null;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.projectLoading = false;
        state.projectError = action.payload;
      });
  },
});

export const { clearError, clearCurrentProject } = projectsSlice.actions;
export default projectsSlice.reducer;
