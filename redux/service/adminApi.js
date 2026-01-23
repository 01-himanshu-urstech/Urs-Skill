import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/v1',
        prepareHeaders: (headers) => {
            const token = document.cookie
                .split('; ')
                .find(row => row.startsWith('auth-token='))
                ?.split('=')[1];
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    keepUnusedDataFor: 90,
    tagTypes: ['Settings', 'Admins', 'Customers', 'Courses', 'Logs', 'Blogs', 'Backlinks', 'Banners', 'Coupons', 'Contacts', 'Transactions','Enquiries'],

    endpoints: (builder) => ({
        // ==========================================
        // 1. AUTHENTICATION (2 Routes)
        // ==========================================
        login: builder.mutation({
            query: (credentials) => ({ url: '/auth/admin/login', method: 'POST', body: credentials }),
        }),
        getMe: builder.query({ query: () => '/auth/me' }),

        // ==========================================
        // 2. ADMIN MANAGEMENT (6 Routes)
        // ==========================================
// ==========================================
        // 2. ADMIN MANAGEMENT (Optimized for Sub-Admin Selection)
        // ==========================================
        getAdmins: builder.query({
            query: () => '/admins/getall-admins',
            // Suggestion: Ensure the backend returns role info so 
            // the frontend can filter for 'sub-admin' specifically.
            providesTags: ['Admins'],
        }),
        getAdminById: builder.query({
            query: (id) => `/admins/get-admin/${id}`,
            providesTags: (result, error, id) => [{ type: 'Admins', id }]
        }),
        addAdmin: builder.mutation({
            query: (newAdmin) => ({ url: '/admins/create', method: 'POST', body: newAdmin }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data: response } = await queryFulfilled;
                    dispatch(adminApi.util.updateQueryData('getAdmins', undefined, (draft) => {
                        draft.data.admins.unshift(response.data.admin);
                    }));
                } catch { }
            },
        }),
        updateAdminById: builder.mutation({
            query: ({ id, ...data }) => ({ url: `/admins/update/${id}`, method: 'PATCH', body: data }),
            async onQueryStarted({ id, ...data }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(adminApi.util.updateQueryData('getAdmins', undefined, (draft) => {
                    const admin = draft.data.admins.find(a => a._id === id);
                    if (admin) Object.assign(admin, data);
                }));
                try { await queryFulfilled; } catch { patchResult.undo(); }
            },
        }),
        updateAdminPermissions: builder.mutation({
            query: ({ id, ...body }) => ({ url: `/admins/update-permissions/${id}`, method: 'PATCH', body }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Admins', id }, 'Admins'],
        }),
        deleteAdmin: builder.mutation({
            query: (id) => ({ url: `/admins/delete/${id}`, method: 'DELETE' }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(adminApi.util.updateQueryData('getAdmins', undefined, (draft) => {
                    draft.data.admins = draft.data.admins.filter(a => a._id !== id);
                }));
                try { await queryFulfilled; } catch { patchResult.undo(); }
            },
        }),

        // ==========================================
        // 3. CUSTOMER MANAGEMENT (5 Routes)
        // ==========================================
        getCustomers: builder.query({
            query: () => '/customers',
            providesTags: ['Customers'],
        }),
        getCustomerById: builder.query({ query: (id) => `/customers/by-id/${id}` }),
        addCustomer: builder.mutation({
            query: (customer) => ({ url: '/customers/create', method: 'POST', body: customer }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data: response } = await queryFulfilled;
                    dispatch(adminApi.util.updateQueryData('getCustomers', undefined, (draft) => {
                        draft.data.customers.unshift(response.data.customer);
                    }));
                } catch { }
            },
        }),
        updateCustomer: builder.mutation({
            query: ({ id, ...data }) => ({ url: `/customers/update/${id}`, method: 'PATCH', body: data }),
            async onQueryStarted({ id, ...data }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(adminApi.util.updateQueryData('getCustomers', undefined, (draft) => {
                    const customer = draft.data.customers.find(c => c._id === id);
                    if (customer) Object.assign(customer, data);
                }));
                try { await queryFulfilled; } catch { patchResult.undo(); }
            },
        }),
        deleteCustomer: builder.mutation({
            query: (id) => ({ url: `/customers/delete/${id}`, method: 'DELETE' }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(adminApi.util.updateQueryData('getCustomers', undefined, (draft) => {
                    draft.data.customers = draft.data.customers.filter(c => c._id !== id);
                }));
                try { await queryFulfilled; } catch { patchResult.undo(); }
            },
        }),

        // ==========================================
        // 4. BLOG MANAGEMENT (6 Routes)
        // ==========================================
        getAllBlogs: builder.query({ query: () => '/blogs/getallblogs', providesTags: ['Blogs'] }),
        getBlogs: builder.query({ query: (id) => `/blogs/by-id/${id}`, providesTags: ['Blogs'] }),
        getWebBlogs: builder.query({ query: () => '/blogs/for-web', providesTags: ['Blogs'] }),
        getBlogBySlug: builder.query({ query: (slug) => `/blogs/public/${slug}` }),
        createBlog: builder.mutation({
            query: (blog) => ({ url: '/blogs/create', method: 'POST', body: blog }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data: response } = await queryFulfilled;
                    dispatch(adminApi.util.updateQueryData('getAllBlogs', undefined, (draft) => {
                        draft.data.blogs.unshift(response.data.blog);
                    }));
                } catch { }
            },
        }),
            updateBlog: builder.mutation({
                    // We expect { id, formData, patch } where 'patch' is a plain object { title, status, etc. }
                    query: ({ id, formData }) => ({ 
                        url: `/blogs/update/${id}`, 
                        method: 'PATCH', 
                        body: formData // This goes to the server
                    }),
                    async onQueryStarted({ id, patch }, { dispatch, queryFulfilled }) {
                        // We only use the plain 'patch' object to update the local Redux state
                        const patchResult = dispatch(
                            adminApi.util.updateQueryData('getAllBlogs', undefined, (draft) => {
                                const blog = draft.data.blogs.find(b => b._id === id);
                                // ✅ We spread 'patch' (plain object), NOT 'formData'
                                if (blog && patch) Object.assign(blog, patch);
                            })
                        );
                        try {
                            await queryFulfilled;
                        } catch {
                            patchResult.undo();
                        }
                    },
                    invalidatesTags: ['Blogs'],
                }),
        deleteBlog: builder.mutation({
            query: (id) => ({ url: `/blogs/delete/${id}`, method: 'DELETE' }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(adminApi.util.updateQueryData('getAllBlogs', undefined, (draft) => {
                    draft.data.blogs = draft.data.blogs.filter(b => b._id !== id);
                }));
                try { await queryFulfilled; } catch { patchResult.undo(); }
            },
        }),

        // ==========================================
        // 5. BANNER MANAGEMENT (5 Routes)
        // ==========================================
        getBanners: builder.query({ query: () => '/banners', providesTags: ['Banners'] }),
        getBannerById: builder.query({ query: (id) => `/banners/${id}`, providesTags: ['Banners'] }),
        createBanner: builder.mutation({
            query: (newBanner) => ({ url: '/banners', method: 'POST', body: newBanner }),
            invalidatesTags: ['Banners'], // Image uploads usually need full refetch
        }),
        updateBanner: builder.mutation({
            query: ({ id, formData }) => ({ url: `/banners/${id}`, method: 'PATCH', body: formData }),
            invalidatesTags: ['Banners'],
        }),
        deleteBanner: builder.mutation({
            query: (id) => ({ url: `/banners/${id}`, method: 'DELETE' }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(adminApi.util.updateQueryData('getBanners', undefined, (draft) => {
                    draft.data.banners = draft.data.banners.filter(b => b._id !== id);
                }));
                try { await queryFulfilled; } catch { patchResult.undo(); }
            },
        }),

       // ==========================================
        // 6. COUPON MANAGEMENT (Enhanced for Assignments)
        // ==========================================
        getCoupons: builder.query({
            query: (params) => ({
                url: '/coupons/get-coupons',
                params: {
                    page: params?.page || 1,
                    limit: params?.limit || 10,
                    status: params?.status !== 'all' ? params?.status : undefined,
                    search: params?.search || undefined
                }
            }),
            // IMPORTANT: If your backend returns sub-admin data inside coupons, 
            // ensure the backend is using .populate('assignedSubAdmin')
            providesTags: ['Coupons'],
        }),
        
        createCoupon: builder.mutation({
            query: (newCoupon) => ({ 
                url: '/coupons/create-coupons', 
                method: 'POST', 
                body: newCoupon // This body should now include assignedSubAdmin ID
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data: response } = await queryFulfilled;
                    // Optimistic update for the coupon list
                    dispatch(adminApi.util.updateQueryData('getCoupons', undefined, (draft) => {
                        if (draft?.data?.coupons) {
                            draft.data.coupons.unshift(response.data.coupon);
                        }
                    }));
                } catch { }
            },
            invalidatesTags: ['Coupons'], 
        }),
        getCouponById: builder.query({
            query: (id) => `/coupons/${id}`,
            // Provides 'Coupons' tag so it refetches if the coupon is updated/deleted
            providesTags: (result, error, id) => [{ type: 'Coupons', id }],
        }),

        // ADDED: Mutation to re-assign or update coupon details
        // Mutation to update coupon details with Optimistic Updates for status changes
        updateCoupon: builder.mutation({
                query: ({ id, ...data }) => ({
                    url: `/coupons/editcoupon/${id}`,
                    method: 'PATCH',
                    body: data
                }),
                // This part handles the immediate UI update before the server responds
                async onQueryStarted({ id, status }, { dispatch, queryFulfilled }) {
                    // Only attempt optimistic update if 'status' is being changed
                    if (status) {
                        const patchResult = dispatch(
                            adminApi.util.updateQueryData('getCoupons', undefined, (draft) => {
                                const coupon = draft.data.coupons.find(c => c._id === id);
                                if (coupon) {
                                    coupon.status = status;
                                }
                            })
                        );
                        try {
                            await queryFulfilled;
                        } catch {
                            // If the API call fails, roll back the UI to the previous state
                            patchResult.undo();
                        }
                    }
                },
                // Standard cache invalidation to ensure data consistency
                invalidatesTags: ['Coupons'],
            }),
        deleteCoupon: builder.mutation({
            query: (id) => ({ url: `/coupons/delete/${id}`, method: 'DELETE' }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(adminApi.util.updateQueryData('getCoupons', undefined, (draft) => {
                    draft.data.coupons = draft.data.coupons.filter(c => c._id !== id);
                }));
                try { await queryFulfilled; } catch { patchResult.undo(); }
            },
        }),

        // ==========================================
        // 7. BACKLINKS (4 Routes)
        // ==========================================
        getBacklinks: builder.query({ query: () => '/backlinks/getallbacklinks', providesTags: ['Backlinks'] }),
        createBacklink: builder.mutation({
            query: (backlink) => ({ url: '/backlinks/create', method: 'POST', body: backlink }),
            invalidatesTags: ['Backlinks'],
        }),
        updateBacklink: builder.mutation({
            query: ({ id, ...data }) => ({ url: `/backlinks/update/${id}`, method: 'PATCH', body: data }),
            invalidatesTags: ['Backlinks'],
        }),
        deleteBacklinkById: builder.mutation({
            query: (id) => ({ url: `/backlinks/delete/${id}`, method: 'DELETE' }),
            invalidatesTags: ['Backlinks'],
        }),

        // ==========================================
        // 8. CONTACTS & QUERIES (3 Routes)
        // ==========================================
        getAllContacts: builder.query({ query: () => '/contacts', providesTags: ['Contacts'] }),
        getContacts: builder.query({ query: (id) => `/contacts/${id}`, providesTags: ['Contacts'] }),
        updateContactStatus: builder.mutation({
            query: ({ id, status }) => ({ url: `/contacts/${id}/status`, method: 'PATCH', body: { status } }),
            invalidatesTags: ['Contacts'],
        }),

        // ==========================================
// 8.5 ENQUIRIES (ADMIN PANEL)
// ==========================================

getAllEnquiries: builder.query({
  query: () => '/enquiries/admin',
  providesTags: ['Enquiries'],
}),

updateEnquiryStatus: builder.mutation({
  query: ({ id, status }) => ({
    url: `/enquiries/status/${id}`,
    method: 'PATCH',
    body: { status },
  }),
  async onQueryStarted({ id, status }, { dispatch, queryFulfilled }) {
    const patchResult = dispatch(
      adminApi.util.updateQueryData(
        'getAllEnquiries',
        undefined,
        (draft) => {
          const enquiry = draft.data.enquiries.find(e => e._id === id);
          if (enquiry) enquiry.status = status;
        }
      )
    );

    try {
      await queryFulfilled;
    } catch {
      patchResult.undo();
    }
  },
  invalidatesTags: ['Enquiries'],
}),


        // ==========================================
        // 9. LOGS & TRANSACTIONS (6 Routes)
        // ==========================================
        getAdminLogs: builder.query({ query: () => '/logs/admin', providesTags: ['Logs'] }),
        getCustomerLogs: builder.query({ query: () => '/logs/customers', providesTags: ['Logs'] }),
        getAllLogs: builder.query({ query: () => '/logs', providesTags: ['Logs'] }),
        getTransactions: builder.query({ query: () => '/transactions', providesTags: ['Transactions'] }),
        getCourses: builder.query({ query: () => '/courses', providesTags: ['Courses'] }),
        getSettings: builder.query({ query: () => '/admin/settings', providesTags: ['Settings'] }),
    }),
});

export const {
    useLoginMutation, useGetMeQuery,
    useGetCustomersQuery, useGetCustomerByIdQuery, useAddCustomerMutation, useUpdateCustomerMutation, useDeleteCustomerMutation,
    useGetAdminsQuery, useGetAdminByIdQuery, useUpdateAdminPermissionsMutation, useUpdateAdminByIdMutation, useAddAdminMutation, useDeleteAdminMutation,
    useGetAdminLogsQuery, useGetCustomerLogsQuery, useGetAllLogsQuery,
    useGetBlogsQuery, useGetAllBlogsQuery, useGetWebBlogsQuery, useGetBlogBySlugQuery, useCreateBlogMutation, useUpdateBlogMutation, useDeleteBlogMutation,
    useGetBacklinksQuery, useCreateBacklinkMutation, useUpdateBacklinkMutation, useDeleteBacklinkByIdMutation,
    useGetBannersQuery, useGetBannerByIdQuery, useCreateBannerMutation, useUpdateBannerMutation, useDeleteBannerMutation,
    useGetCouponsQuery, useCreateCouponMutation,useGetCouponByIdQuery, useUpdateCouponMutation, useDeleteCouponMutation,
    useGetContactsQuery, useGetAllContactsQuery, useUpdateContactStatusMutation,
    useGetTransactionsQuery, useGetCoursesQuery, useGetSettingsQuery,
    useGetAllEnquiriesQuery,useUpdateEnquiryStatusMutation,
} = adminApi;