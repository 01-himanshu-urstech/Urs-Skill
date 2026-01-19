import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const publicBlogApi = createApi({
  reducerPath: 'publicBlogApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1',
  }),

  endpoints: (builder) => ({
    getPublicBlogs: builder.query({
      query: () => '/blogs/public',
    }),

    getBlogBySlug: builder.query({
      query: (slug) => `/blogs/public/${slug}`,
    }),
  }),
});

export const {
  useGetPublicBlogsQuery,
  useGetBlogBySlugQuery,
} = publicBlogApi;
