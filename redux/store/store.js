import { configureStore } from '@reduxjs/toolkit';
import { adminApi } from '../service/adminApi';
import authReducer from '../service/authSlice'; // ✅ Import the new slice

export const store = configureStore({
    reducer: {
        [adminApi.reducerPath]: adminApi.reducer,
        auth: authReducer, // ✅ Add this key to fix the 'undefined' error
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(adminApi.middleware),
});