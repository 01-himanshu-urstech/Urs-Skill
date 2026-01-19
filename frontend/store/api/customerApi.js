import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const customerApi = createApi({
  reducerPath: 'customerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/customers`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token; // ✅ SAFE

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    }
  }),
  endpoints: (builder) => ({
    getMyProfile: builder.query({
      query: () => '/me'
    })
  })
});

export const { useGetMyProfileQuery } = customerApi;
