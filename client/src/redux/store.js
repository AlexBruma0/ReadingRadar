import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slices/Login';
import registrationReducer from './slices/Register';
import booksReducer from './slices/Books'

const store = configureStore({
  reducer: {
    login: loginReducer,
    registration: registrationReducer,
    books: booksReducer
  },
});

export default store;

