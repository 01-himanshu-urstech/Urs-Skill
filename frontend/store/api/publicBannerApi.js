import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const publicBannerApi = createApi({
  reducerPath: 'publicBannerApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1',
  }),

  endpoints: (builder) => ({
    getHomeBanners: builder.query({
      query: () => ({
        url: '/banners',
        params: {
          position: 'HOME',
          isActive: true,
        },
      }),
    }),
  }),
});

export const { useGetHomeBannersQuery } = publicBannerApi;
