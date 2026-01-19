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
    // ✅ Updated TagTypes based on your collection
    tagTypes: ['Settings', 'Admins', 'Customers', 'Courses', 'Logs', 'Blogs', 'Backlinks', 'Banners', 'Coupons', 'Contacts', 'Transactions'],

    endpoints: (builder) => ({
        // 1. Authentication
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/admin/login',
                method: 'POST',
                body: credentials,
            }),
        }),

        // 2. Customer Management
        getCustomers: builder.query({
            query: () => '/customers',
            providesTags: ['Customers'],
        }),
        getCustomerById: builder.query({
            query: (id) => `/customers/by-id/${id}`, // get Singlle Customer
            providesTags: ['Customers'],
        }),
        addCustomer: builder.mutation({
            query: (customer) => ({
                url: '/customers/create',
                method: 'POST',
                body: customer,
            }),
            invalidatesTags: ['Customers'],
        }),
        updateCustomer: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/customers/update/${id}`, // Customer Update
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Customers'],
        }),
        deleteCustomer: builder.mutation({
            query: (id) => ({
                url: `/customers/delete/${id}`, // Customer Delete
                method: 'DELETE',
            }),
            invalidatesTags: ['Customers'],
        }),

        // 3. Admin Management
        getAdmins: builder.query({
            query: () => '/admins/getall-admins',
            providesTags: ['Admins'],
        }),
        getAdminById: builder.query({
            query: (id) => `/admins/get-admin/${id}`,
            providesTags: ['Admins'],
        }),
        updateAdminPermissions: builder.mutation({
            query: ({ id, permissions, role }) => ({
                url: `/admins/update-permissions/${id}`,
                method: 'PATCH',
                body: { permissions, role },
            }),
            invalidatesTags: ['Admins'],
        }),
        updateAdminById: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/admins/update/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Admins'],
        }),

        addAdmin: builder.mutation({
            query: (newAdmin) => ({
                url: '/admins/create',
                method: 'POST',
                body: newAdmin,
            }),
            invalidatesTags: ['Admins'],
        }),
        deleteAdmin: builder.mutation({
            query: (id) => ({
                url: `/admins/delete/${id}`, // deleteadmin
                method: 'DELETE',
            }),
            invalidatesTags: ['Admins'],
        }),

        // 4. Log Management
        getAdminLogs: builder.query({
            query: () => '/logs/admin', // admin logs
            providesTags: ['Logs'],
        }),
        getCustomerLogs: builder.query({
            query: () => '/logs/customers', // customer logs
            providesTags: ['Logs'],
        }),
        getAllLogs: builder.query({
            query: () => '/logs', // get all logs
            providesTags: ['Logs'],
        }),

        // 5. Blog Management

        getBlogs: builder.query({
            query: (id) => `/blogs/by-id/${id}`, // get blogs
            providesTags: ['Blogs'],
        }),
        getAllBlogs: builder.query({
            query: () => '/blogs/getallblogs', // getall blogs
            providesTags: ['Blogs'],
        }),
        getWebBlogs: builder.query({
            query: () => '/blogs/for-web',
            providesTags: ['Blogs'],
        }),
        getBlogBySlug: builder.query({
            query: (slug) => `/blogs/public/${slug}`
        }),
        createBlog: builder.mutation({
            query: (blog) => ({
                url: '/blogs/create',
                method: 'POST',
                body: blog,
            }),
            invalidatesTags: ['Blogs'],
        }),
        updateBlog: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/blogs/update/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Blogs'],
        }),
        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `/blogs/delete/${id}`, // del blogs
                method: 'DELETE',
            }),
            invalidatesTags: ['Blogs'],
        }),

        // 6. Course & Settings remains same...
        getCourses: builder.query({
            query: () => '/courses',
            providesTags: ['Courses'],
        }),
        getSettings: builder.query({
            query: () => '/admin/settings',
            providesTags: ['Settings'],
        }),

        // 7. BACKLINKS MANAGEMENT (🔥 ADD THIS SECTION)
        getBacklinks: builder.query({
            query: () => '/backlinks/getallbacklinks', // GET all backlinks
            providesTags: ['Backlinks'],
        }),
        createBacklink: builder.mutation({
            query: (backlink) => ({
                url: '/backlinks/create',
                method: 'POST',
                body: backlink,
            }),
            invalidatesTags: ['Backlinks'],
        }),
        updateBacklink: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/backlinks/update/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Backlinks'],
        }),
        deleteBacklinkById: builder.mutation({
            query: (id) => ({
                url: `/backlinks/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Backlinks'],
        }),

        // 8. BANNER MANAGEMENT
        getBanners: builder.query({
            query: () => '/banners', //
            providesTags: ['Banners'],
        }),
        getBannerById: builder.query({
            query: (id) => `/banners/${id}`, //
            providesTags: ['Banners'],
        }),
        createBanner: builder.mutation({
            query: (newBanner) => ({
                url: '/banners', //
                method: 'POST',
                body: newBanner, // Expects FormData for image upload
            }),
            invalidatesTags: ['Banners'],
        }),
        updateBanner: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/banners/${id}`, //
                method: 'PATCH',
                body: formData,
            }),
            invalidatesTags: ['Banners'],
        }),
        deleteBanner: builder.mutation({
            query: (id) => ({
                url: `/banners/${id}`, //
                method: 'DELETE',
            }),
            invalidatesTags: ['Banners'],
        }),
        // 8. Coupon Management
        getCoupons: builder.query({
            query: () => '/coupons/get-coupons', //
            providesTags: ['Coupons'],
        }),
        createCoupon: builder.mutation({
            query: (newCoupon) => ({
                url: '/coupons/create-coupons', //
                method: 'POST',
                body: newCoupon,
            }),
            invalidatesTags: ['Coupons'],
        }),
        updateCouponStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/coupons/update-status/${id}`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: ['Coupons'],
        }),
        deleteCoupon: builder.mutation({
            query: (id) => ({
                url: `/coupons/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Coupons'],
        }),

        // ✅ 9. CONTACT US MANAGEMENT (NEW SECTION)
        getContacts: builder.query({
            query: (id) => `/contacts/${id}`, // GET all contact queries
            providesTags: ['Contacts'],
        }),
        getAllContacts: builder.query({
            query: () => '/contacts', // GET all contact queries
            providesTags: ['Contacts'],
        }),
        updateContactStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/contacts/${id}/status`,
                method: 'PATCH',
                body: { status }, // Expects 'NEW', 'CONTACTED', or 'CLOSED'
            }),
            invalidatesTags: ['Contacts'],
        }),

        // ✅ 10. TRANSACTIONS MANAGEMENT (NEW SECTION)
        getTransactions: builder.query({
            query: () => '/transactions', // GET all transactions
            providesTags: ['Transactions'],
        }),

    }),
});


export const {
    useLoginMutation,
    useGetCustomersQuery,
    useGetCustomerByIdQuery,
    useAddCustomerMutation,
    useUpdateCustomerMutation,
    useDeleteCustomerMutation,
    useGetAdminsQuery,
    useGetAdminByIdQuery,
    useUpdateAdminByIdMutation,
    useAddAdminMutation,
    useDeleteAdminMutation,
    useGetAdminLogsQuery,
    useGetCustomerLogsQuery,
    useGetAllLogsQuery,
    useGetBlogsQuery,
    useGetAllBlogsQuery,
    useUpdateBlogMutation,
    useGetWebBlogsQuery,
    useCreateBlogMutation,
    useGetBlogBySlugQuery,
    useDeleteBlogMutation,
    useGetCoursesQuery,
    useGetSettingsQuery,
    useGetBacklinksQuery,
    useCreateBacklinkMutation,
    useUpdateBacklinkMutation,
    useDeleteBacklinkByIdMutation,
    useGetBannersQuery,
    useGetBannerByIdQuery,
    useCreateBannerMutation,
    useUpdateBannerMutation,
    useDeleteBannerMutation,
    useGetCouponsQuery,
    useCreateCouponMutation,
    useUpdateCouponStatusMutation,
    useDeleteCouponMutation,
    useGetContactsQuery,
    useGetAllContactsQuery,
    useUpdateContactStatusMutation,
    useDeleteContactMutation,
    useGetTransactionsQuery,
} = adminApi;