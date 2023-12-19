import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async (userId, thunkAPI) => {
  // Replace with your actual API call
  const response = await fetch(`${import.meta.env.VITE_API_URL}/books/${userId}`);
  return response.json();
});

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    items: [],
    status: 'idle', // 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    // Reducer methods if needed
  },
  extraReducers: {
    [fetchBooks.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchBooks.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      // Add books to the state array
      state.items = action.payload;
    },
    [fetchBooks.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export default booksSlice.reducer;
