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
    }),
    applyCoupon: builder.mutation({
      query: (body) => ({
        url: '/api/v1/coupons/apply',
        method: 'POST',
        body // expects { code, courseId }
      })
    }),
    getMyTransactions: builder.query({
      query: () => '/api/v1/transactions/my',
    }),
  })
});

export const {
  useCreateTransactionMutation,
  useApplyCouponMutation,
  useGetMyTransactionsQuery,
} = transactionApi;
