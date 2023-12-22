import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async (userId, thunkAPI) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/books/${userId}`);
  console.log('done')
  return response.json();
});

export const reorderAPIBook = createAsyncThunk( 'books/updateBook', async (order, thunkAPI) => {
    const jwtToken = localStorage.getItem('jwtToken')
    await fetch(`${import.meta.env.VITE_API_URL}/books/reorder`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify({ currentOrder: order.current, newOrder: order.new, currentOrderId: order.id }),
      });
    }
  );

export const updateAPIBook = createAsyncThunk( 'books/updateBook', async (updatedBook, thunkAPI) => {
    const jwtToken = localStorage.getItem('jwtToken')
    console.log(updatedBook)
    await fetch(`${import.meta.env.VITE_API_URL}/books/${updatedBook._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify({ book: updatedBook }),
      });
    }
  );

  export const moveBookToCategoryAPI = createAsyncThunk(
    'books/moveBookCategory',
    async ({ currentOrder, newOrder, currentOrderId, currentCategory, newCategory }, thunkAPI) => {
      const jwtToken = localStorage.getItem('jwtToken'); 
  
      await fetch(`${import.meta.env.VITE_API_URL}/books/move`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}` 
        },
        body: JSON.stringify({ 
          currentOrder, 
          newOrder, 
          currentOrderId, 
          currentCategory, 
          newCategory 
        }),
      });
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
        state.boards.toBeRead = toBeRead
        state.boards.reading = reading
        state.boards.read = read
      },
  },
  extraReducers: {
    [updateAPIBook.pending]: (state, action) => {
        console.log('updatepending')
        state.status = 'loading';
      },
    [updateAPIBook.fulfilled]: (state, action) => {
        console.log('updatescss')
    state.status = 'succeeded';
    },
    [updateAPIBook.rejected]: (state, action) => {
    console.log("updatefail")
    state.status = 'failed';
    state.error = action.error.message;
    console.log(state.error)
    },
    [fetchBooks.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      const books = action.payload
      const boards = {
        toBeRead: books.filter(book => book.category === "ToBeRead").sort((a, b) => a.order - b.order),
        reading: books.filter(book => book.category === "Reading").sort((a, b) => a.order - b.order),
        read: books.filter(book => book.category === "Read").sort((a, b) => a.order - b.order)
      };
      state.boards = boards
    },

  },
});

export default booksSlice.reducer;

export const { updateBoards } = booksSlice.actions;
