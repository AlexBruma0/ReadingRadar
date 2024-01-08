import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async action for registration using createAsyncThunk
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ userData, profilePicture }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      Object.keys(userData).forEach(key => formData.append(key, userData[key]));
      formData.append('profilePicture', profilePicture);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/register`,
        {
          method: "POST",
          headers: {
            // Don't set Content-Type header when using FormData
            // The browser will set it for you, including the necessary boundary parameter
          },
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const user = await response.json();
      localStorage.setItem("jwtToken", user.jwtToken);
      localStorage.setItem("userId", user.userId);
      localStorage.setItem("viewingId", user.userId);
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// createSlice for registration
const registrationSlice = createSlice({
  name: "registration",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,
  },
  reducers: {},
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    [registerUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default registrationSlice.reducer;
