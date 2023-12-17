import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './authActions/Login';
import registrationReducer from './authActions/Register';

const store = configureStore({
  reducer: {
    login: loginReducer,
    registration: registrationReducer,
  },
});

export default store;

