import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './authReducer';

// Define a function to load state from local storage
const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined; // If no data in local storage, return undefined
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading state from local storage:', err);
    return undefined;
  }
};

// Get the initial state from local storage (if available)
const persistedState = loadStateFromLocalStorage();

const rootReducer = combineReducers({
  auth: authReducer, // Use your authReducer as it combines login and register reducers
  // Add other reducers here if needed
});

const store = createStore(rootReducer, persistedState, applyMiddleware(thunk));

// Subscribe to store changes to save the state to local storage
store.subscribe(() => {
  try {
    const serializedState = JSON.stringify(store.getState());
    localStorage.setItem('reduxState', serializedState);
  } catch (err) {
    console.error('Error saving state to local storage:', err);
  }
});

export default store;
