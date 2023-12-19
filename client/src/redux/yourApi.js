// services/yourApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const yourApi = createApi({
  reducerPath: 'yourApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => 'posts',
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetPostsQuery } = yourApi;
