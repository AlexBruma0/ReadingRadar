import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async action using createAsyncThunk
export const loginUser = createAsyncThunk(
  "login/userLogin",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        },
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const user = await response.json();
      localStorage.setItem("jwtToken", user.token);
      localStorage.setItem("userId", user.userId);
      localStorage.setItem("viewingId", user.userId);
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// createSlice for login
const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,
  },
  reducers: {
    // Reducer for logout
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.isLoading = false;
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("viewingId");
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    [loginUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// Export the reducer and actions
export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
