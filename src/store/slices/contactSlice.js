import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient, API_ENDPOINTS } from "../api/apiConfig";

// Async thunk for sending message
export const sendMessage = createAsyncThunk(
  "contact/sendMessage",
  async (messageData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.MESSAGE_SEND,
        messageData,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send message",
      );
    }
  },
);

const initialState = {
  loading: false,
  success: false,
  error: null,
  message: null,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    clearContactState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { clearContactState, clearError } = contactSlice.actions;
export default contactSlice.reducer;
