import { configureStore } from '@reduxjs/toolkit';
import { publicBannerApi } from './api/publicBannerApi';
import { publicBlogApi } from './api/BlogApi';
import { customerApi } from './api/customerApi';
import { transactionApi } from './api/transactionApi'; // ✅ ADD
import contactReducer from './slices/contactSlice.js';
import authReducer from './slices/authSlice.js';

export const store = configureStore({
  reducer: {
    [publicBannerApi.reducerPath]: publicBannerApi.reducer,
    [publicBlogApi.reducerPath]: publicBlogApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer, // ✅ ADD
    contact: contactReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(publicBannerApi.middleware)
      .concat(publicBlogApi.middleware)
      .concat(customerApi.middleware)
      .concat(transactionApi.middleware), // ✅ ADD
});
