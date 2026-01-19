import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const transactionApi = createApi({
  reducerPath: 'transactionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    createTransaction: builder.mutation({
      query: (body) => ({
        url: '/api/v1/transactions/create',
        method: 'POST',
        body
      })
    })
  })
});

export const {
  useCreateTransactionMutation
} = transactionApi;
