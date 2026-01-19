import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

// ---------------- LOGIN ----------------
export const customerLogin = createAsyncThunk(
  'auth/customerLogin',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_URL}/api/v1/auth/customer/login`,
        payload
      );
      return res.data.data; // { token }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Login failed'
      );
    }
  }
);

// ---------------- SIGNUP ----------------
export const customerSignup = createAsyncThunk(
  'auth/customerSignup',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_URL}/api/v1/auth/customer/signup`,
        payload
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Signup failed'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token:
      typeof window !== 'undefined'
        ? localStorage.getItem('token')
        : null,
    isAuthenticated:
      typeof window !== 'undefined'
        ? !!localStorage.getItem('token')
        : false,
    loading: false,
    error: null
  },

  reducers: {
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    }
  },

  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(customerLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(customerLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(customerLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // SIGNUP
      .addCase(customerSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(customerSignup.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(customerSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
