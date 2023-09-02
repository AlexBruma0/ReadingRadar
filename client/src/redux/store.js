// store.js
import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer'; // Your authentication reducer

const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers here if needed
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
