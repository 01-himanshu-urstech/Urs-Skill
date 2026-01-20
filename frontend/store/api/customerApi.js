import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const customerApi = createApi({
  reducerPath: 'customerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/customers`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ['Customer'], // Added for auto-refresh
  endpoints: (builder) => ({
    getMyProfile: builder.query({
      query: () => '/me',
      providesTags: ['Customer'], // Link this query to the tag
    }),
    // New Mutation for Self-Update
    updateMyProfile: builder.mutation({
      query: (data) => ({
        url: '/update-me',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Customer'], // Refetches 'me' after success
    }),
  })
});

export const { useGetMyProfileQuery, useUpdateMyProfileMutation } = customerApi;