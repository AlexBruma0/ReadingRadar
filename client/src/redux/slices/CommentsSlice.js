import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCommentsByBook = createAsyncThunk(
  "comments/fetchCommentsByBook",
  async (bookId, thunkAPI) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/comments/book/${bookId}`,
    );
    return response.json();
  },
);

export const createCommentAPI = createAsyncThunk(
  "comments/createComment",
  async ({ content, bookId }, thunkAPI) => {
    const jwtToken = localStorage.getItem("jwtToken");
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/comments/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({ content, bookId }),
      },
    );
    return response.json();
  },
);

export const updateCommentAPI = createAsyncThunk(
  "comments/updateComment",
  async ({ commentId, content }, thunkAPI) => {
    const jwtToken = localStorage.getItem("jwtToken");
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/comments/${commentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({ content }),
      },
    );
    return response.json();
  },
);

export const deleteCommentAPI = createAsyncThunk(
  "comments/deleteComment",
  async (commentId, thunkAPI) => {
    const jwtToken = localStorage.getItem("jwtToken");
    await fetch(`${import.meta.env.VITE_API_URL}/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    return commentId;
  },
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchCommentsByBook.pending]: (state, action) => {
      state.status = "pending";
    },

    [fetchCommentsByBook.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.comments = action.payload;
    },
    [createCommentAPI.fulfilled]: (state, action) => {
      console.log("action.payload: ",action.payload);
      state.comments.push(action.payload);
    },
    [updateCommentAPI.fulfilled]: (state, action) => {
      const index = state.comments.findIndex(
        (comment) => comment._id === action.payload._id,
      );
      if (index !== -1) {
        state.comments[index] = action.payload;
      }
    },
    [deleteCommentAPI.fulfilled]: (state, action) => {
      state.comments = state.comments.filter(
        (comment) => comment._id !== action.payload,
      );
    },
  },
});

export default commentsSlice.reducer;
