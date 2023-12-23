import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async action for registration using createAsyncThunk
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const user = await response.json();
      localStorage.setItem('jwtToken', user.token);
      localStorage.setItem('userId', user.userId)
      localStorage.setItem('viewingId', user.userId)
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// createSlice for registration
const registrationSlice = createSlice({
  name: 'registration',
  initialState: {
    user: null,
    isLoading: false,
    error: null,
    isAuthenticated: false
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
