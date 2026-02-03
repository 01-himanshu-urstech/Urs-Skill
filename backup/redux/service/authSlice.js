import { createSlice } from '@reduxjs/toolkit';

// Helper to safely get data on the client side
const getInitialUser = () => {
    if (typeof window !== 'undefined') {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    }
    return null;
};

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: getInitialUser(), //    Load from localStorage on startup
        token: null,
    },
    reducers: {
        setCredentials: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            //    Save to localStorage so it survives refresh
            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(user));
            }
        },
        logOut: (state) => {
            state.user = null;
            state.token = null;
            if (typeof window !== 'undefined') {
                localStorage.removeItem('user');
            }
        },
    },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;