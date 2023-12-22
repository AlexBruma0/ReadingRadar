import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async (userId, thunkAPI) => {
  // Replace with your actual API call
  const response = await fetch(`${import.meta.env.VITE_API_URL}/books/${userId}`);
  console.log('done')
  return response.json();
});

export const reorderAPIBook = createAsyncThunk( 'books/updateBook', async (order, thunkAPI) => {
    // Replace with your actual API call
    const jwtToken = localStorage.getItem('jwtToken')
    console.log("neworder: ", order.new, " currorder: ", order.current)
    await fetch(`${import.meta.env.VITE_API_URL}/books/reorder`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify({ currentOrder: order.current, newOrder: order.new, currentOrderId: order.id }),
      });
    console.log('donee')
    }
  );

// Async thunk for updating all books
export const updateAPIBook = createAsyncThunk( 'books/updateBook', async (updatedBook, thunkAPI) => {
    // Replace with your actual API call
    const jwtToken = localStorage.getItem('jwtToken')
    console.log(updatedBook)
    await fetch(`${import.meta.env.VITE_API_URL}/books/${updatedBook._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
          // Add your auth headers if needed
        },
        body: JSON.stringify({ book: updatedBook }),
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
        state.boards.toBeRead = toBeRead.sort((a, b) => {
            if (a.order < b.order) {
                return -1;
            }
            if (a.order > b.order) {
                return 1;
            }
            return 0;
        });
        state.boards.reading = reading.sort((a, b) => a.id - b.id);
        state.boards.read = read.sort((a, b) => {
            if (a.order < b.order) {
                return -1;
            }
            if (a.order > b.order) {
                return 1;
            }
            return 0;
        });
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

    // Update the state with the new books
    // state.boards = action.payload.addedBooks;
    },
    [updateAPIBook.rejected]: (state, action) => {
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
        toBeRead: books.filter(book => book.category === "To Be Read").sort((a, b) => a.order - b.order),
        reading: books.filter(book => book.category === "Reading").sort((a, b) => a.order - b.order),
        read: books.filter(book => book.category === "Read").sort((a, b) => a.order - b.order)
      };
      state.boards = boards
    },

  },
});

export default booksSlice.reducer;

export const { updateBoards } = booksSlice.actions;
