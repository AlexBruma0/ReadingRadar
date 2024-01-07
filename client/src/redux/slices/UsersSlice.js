import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const users = await response.json();
      return users;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateUserProfilePicture = createAsyncThunk(
  'users/updateUserProfilePicture',
  async ({ userId, profilePicture }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('profilePicture', profilePicture);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/profilePicture`, {
        method: 'PUT',
        headers: {
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update profile picture');
      }

      const updatedUser = await response.json();
      return updatedUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        console.log("response not okay");
        throw new Error("Failed to fetch users");
      }

      const user = await response.json();
      console.log("response ok", user);
      return user;
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  },
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    },
    [fetchUsers.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {} = usersSlice.actions;
export default usersSlice.reducer;
