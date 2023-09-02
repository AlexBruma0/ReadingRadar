// reducers/authReducer.js

import { combineReducers } from 'redux';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './authActions/Login';
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from './authActions/Register';

// Initial state for authentication
const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

// Reducer for login
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Reducer for registration
const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: null,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Combine the login and registration reducers
const authReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
});

export default authReducer;
