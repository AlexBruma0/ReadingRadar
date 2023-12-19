// store.js
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { yourApi } from './services/yourApi';

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [yourApi.reducerPath]: yourApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(yourApi.middleware),
});

// Optional: setup listeners for query refetching
setupListeners(store.dispatch);
