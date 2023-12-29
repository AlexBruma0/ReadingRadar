import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slices/LoginSlice';
import registrationReducer from './slices/RegisterSlice';
import booksReducer from './slices/BooksSlice'
import usersReducer from './slices/UsersSlice'
import commentsReducer from './slices/CommentsSlice'

const store = configureStore({
  reducer: {
    login: loginReducer,
    registration: registrationReducer,
    books: booksReducer,
    users: usersReducer,
    comments: commentsReducer
  },
});

export default store;

