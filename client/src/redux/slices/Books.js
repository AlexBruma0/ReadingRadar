import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async (userId, thunkAPI) => {
  // Replace with your actual API call
  const response = await fetch(`${import.meta.env.VITE_API_URL}/books/${userId}`);
  console.log('done')
  return response.json();
});

// Async thunk for updating all books
export const updateAPIBooks = createAsyncThunk( 'books/updateAllBooks', async (books, ownerId, thunkAPI) => {
    // Replace with your actual API call
    await fetch(`${import.meta.env.VITE_API_URL}/books/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Add your auth headers if needed
        },
        body: JSON.stringify({ books: books, ownerId: ownerId }),
      });
    console.log('donee')
    }
  );

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    boards: {
        toBeRead: [],
        reading: [],
        read: [],
    },
    status: 'idle', 
    error: null,
  },
  reducers: {
    updateBoards: (state, action) => {
        const { toBeRead, reading, read } = action.payload;
        state.boards.toBeRead = toBeRead || state.boards.toBeRead;
        state.boards.reading = reading || state.boards.reading;
        state.boards.read = read || state.boards.read;
      },
  },
  extraReducers: {
    [updateAPIBooks.pending]: (state, action) => {
        console.log('updatepending')
        state.status = 'loading';
      },
    [updateAPIBooks.fulfilled]: (state, action) => {
        console.log('updatescss')
    state.status = 'succeeded';

    // Update the state with the new books
    // state.boards = action.payload.addedBooks;
    },
    [updateAPIBooks.rejected]: (state, action) => {
        console.log("updatefail")
    state.status = 'failed';
    state.error = action.error.message;
    console.log(state.error)
    },
    [fetchBooks.fulfilled]: (state, action) => {
      console.log('fetchsuccss')
      state.status = 'succeeded';
      // Add books to the state array
      const books = action.payload
      const boards = {
        toBeRead: books.filter(book => book.category === "To Be Read"),
        reading: books.filter(book => book.category === "Reading"),
        read: books.filter(book => book.category === "Read")
      };
      state.boards = boards
    },

  },
});

export default booksSlice.reducer;

export const { updateBoards } = booksSlice.actions;
