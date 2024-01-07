import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

function lowercaseFirstLetter(str) {
  if(str && str.length > 0) {
      return str.charAt(0).toLowerCase() + str.slice(1);
  }
  return str;
}

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
    console.log("bookslice: ", response)
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
    await fetch(`${import.meta.env.VITE_API_URL}/books/reorder`, {
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
  },
);

export const updateAPIBook = createAsyncThunk(
  "books/updateBook",
  async (updatedBook, thunkAPI) => {
    const jwtToken = localStorage.getItem("jwtToken");
    const response = await fetch(`${import.meta.env.VITE_API_URL}/books/${updatedBook._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({ book: updatedBook }),
    });
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

    console.log(newBook);
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

function findKeyIgnoringSpacesAndCaps(obj, key) {
  // Normalize the input key
  const normalizedKey = key.replace(/\s/g, '').toLowerCase();

  // Iterate over the object keys
  for (let objKey in obj) {
    // Normalize the object key
    const normalizedObjKey = objKey.replace(/\s/g, '').toLowerCase();

    // If the normalized keys match, return the original object key
    if (normalizedObjKey === normalizedKey) {
      return objKey;
    }
  }

  // If no matching key was found, return null
  return null;
}


const booksSlice = createSlice({
  name: "books",
  initialState: {
    currentBook: null,
    boards: {
      toBeRead: [],
      reading: [],
      read: [],
    },
    status: "idle",
    error: null,
  },
  reducers: {
    updateBoards: (state, action) => {
      const { toBeRead, reading, read } = action.payload;
      state.boards.toBeRead = toBeRead;
      state.boards.reading = reading;
      state.boards.read = read;
    },
    createBook: (state, action) => {
      const category = action.payload.category;
      state.boards[category].unshift(action.payload);
    },
    deleteBook: (state, action) => {
      Object.keys(state.boards).forEach((category) => {
        state.boards[category] = state.boards[category].filter(
          (book) => book._id !== action.payload,
        );
      });
    },

    resetCurrentBook: (state) => {
      state.currentBook = null;
    },
    updateBook: (state, action) => {
      console.log(action.payload);
      const { _id, category, ...updatedData } = action.payload;
      const normalizedCategory = findKeyIgnoringSpacesAndCaps(state.boards, category);
      console.log("normalized cat",normalizedCategory);
      const bookIndex = state.boards[normalizedCategory].findIndex(
        (book) => book._id === _id,
      );
      console.log("book index", bookIndex);
      if (bookIndex !== -1) {
        state.boards[category][bookIndex] = {
          ...state.boards[category][bookIndex],
          ...updatedData,
        };
      }
    },
  },
  extraReducers: {
    [updateAPIBook.pending]: (state, action) => {
      state.status = "loading";
    },
    [updateAPIBook.fulfilled]: (state, action) => {
      state.status = "succeeded";
    },
    [updateAPIBook.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [fetchBooks.fulfilled]: (state, action) => {
      state.status = "succeeded";
      const books = action.payload;
      const boards = {
        toBeRead: books
          .filter((book) => book.category === "ToBeRead")
          .sort((a, b) => a.order - b.order),
        reading: books
          .filter((book) => book.category === "Reading")
          .sort((a, b) => a.order - b.order),
        read: books
          .filter((book) => book.category === "Read")
          .sort((a, b) => a.order - b.order),
      };
      state.boards = boards;
    },
    [fetchBookById.fulfilled]: (state, action) => {
      state.currentBook = action.payload;
    },
  },
});

export default booksSlice.reducer;

export const { updateBoards, createBook, deleteBook, updateBook, resetCurrentBook } =
  booksSlice.actions;
