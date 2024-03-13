import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (userId, thunkAPI) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/books/${userId}`,
    );
    return response.json();
  },
);

export const fetchAmazonBooks = createAsyncThunk(
  "books/searchBooks",
  async (query, thunkAPI) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/books/searchbooks/${query}`,
    );
    return response.json();
  },
);

export const fetchBookById = createAsyncThunk(
  "books/fetchBook",
  async (bookId, thunkAPI) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/books/getbook/${bookId}`,
    );
    return response.json();
  },
);

export const reorderAPIBook = createAsyncThunk(
  "books/updateBook",
  async (order, thunkAPI) => {
    const jwtToken = localStorage.getItem("jwtToken");
    const response = await fetch(`${import.meta.env.VITE_API_URL}/books/reorder`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        currentOrder: order.current,
        newOrder: order.new,
        currentOrderId: order.id,
      }),
    });
    return response.json();
  },
);

export const updateAPIBook = createAsyncThunk(
  "books/updateBook",
  async (updatedBook, thunkAPI) => {
    const jwtToken = localStorage.getItem("jwtToken");
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/books/${updatedBook._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({ book: updatedBook }),
      },
    );
    return response.json();
  },
);

export const moveBookToCategoryAPI = createAsyncThunk(
  "books/moveBookCategory",
  async (
    { currentOrder, newOrder, currentOrderId, currentCategory, newCategory },
    thunkAPI,
  ) => {
    const jwtToken = localStorage.getItem("jwtToken");

    await fetch(`${import.meta.env.VITE_API_URL}/books/move`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        currentOrder,
        newOrder,
        currentOrderId,
        currentCategory,
        newCategory,
      }),
    });
  },
);

export const createBookAPI = createAsyncThunk(
  "books/createBook",

  async (newBook, thunkAPI) => {
    const jwtToken = localStorage.getItem("jwtToken");
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/books/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(newBook),
      },
    );
    return response.json();
  },
);

export const deleteBookAPI = createAsyncThunk(
  "books/deleteBook",
  async (bookId, thunkAPI) => {
    const jwtToken = localStorage.getItem("jwtToken");
    await fetch(`${import.meta.env.VITE_API_URL}/books/${bookId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    return bookId;
  },
);

const booksSlice = createSlice({
  name: "books",
  initialState: {
    currentBook: null,
    boards: {},
    status: "idle",
    error: null,
  },
  reducers: {
    updateBoards: (state, action) => {
      const categories = action.payload;
      Object.keys(categories).forEach((category) => {
        state.boards[category] = categories[category];
      });
    },
    createBoard: (state, action) => {
      // New reducer for creating a board
      const newBoardName = action.payload;
      if (!state.boards[newBoardName]) {
        state.boards[newBoardName] = [];
      }
    },
    createBook: (state, action) => {
      const category = action.payload.category;
      if (!state.boards[category]) {
        state.boards[category] = [];
      }
      state.boards[category].unshift(action.payload);
    },
    resetCurrentBook: (state) => {
      state.currentBook = null;
    },
  },
  extraReducers: {
    [fetchBooks.fulfilled]: (state, action) => {
      state.status = "succeeded";
      const books = action.payload;
      const boards = books.reduce((acc, book) => {
        const category = book.category;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(book);
        acc[category].sort((a, b) => a.order - b.order);
        return acc;
      }, {});
      state.boards = boards;
    },
    [fetchBookById.fulfilled]: (state, action) => {
      state.currentBook = action.payload;
    },
    [createBookAPI.fulfilled]: (state, action) => {
      const newBooks = action.payload;
      for (const newBook of newBooks) {
        const category = newBook.category;
        if (!state.boards[category]) {
          state.boards[category] = [];
        }
        state.boards[category].unshift(newBook);
      }
    },
  },
});

export default booksSlice.reducer;

export const selectBoardNames = (state) => Object.keys(state.books.boards);

export const {
  updateBoards,
  createBook,
  deleteBook,
  updateBook,
  resetCurrentBook,
  createBoard,
} = booksSlice.actions;
