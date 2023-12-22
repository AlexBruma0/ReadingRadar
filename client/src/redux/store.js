import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slices/LoginSlice';
import registrationReducer from './slices/RegisterSlice';
import booksReducer from './slices/BooksSlice'

const store = configureStore({
  reducer: {
    login: loginReducer,
    registration: registrationReducer,
    books: booksReducer
  },
});

export default store;

