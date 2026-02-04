import { type PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { LoginDto, RegisterDto, VerifyDTO } from '@/types/auth.type';
import type { User } from '@/types/users.type';
import { authService } from '@/services/auth.service';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  error?: string | null;
  isOtpStep: boolean;
  registerContact: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  loading: false,
  error: null,
  isOtpStep: false,
  registerContact: null,
};

// Login Thunk
export const loginThunk = createAsyncThunk(
  'auth/login',
  async (payload: LoginDto, { rejectWithValue }) => {
    try {
      const res = await authService.login(payload);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed: ');
    }
  },
);

// Register Thunk
export const registerThunk = createAsyncThunk(
  'auth/register',
  async (payload: RegisterDto, { rejectWithValue }) => {
    try {
      const res = await authService.register(payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(`Register failed: ${error}`);
    }
  },
);

// Verify OTP Thunk
export const verifyOtpThunk = createAsyncThunk(
  'auth/verifyOtp',
  async (data: VerifyDTO, { rejectWithValue }) => {
    try {
      return await authService.verifyOtp(data);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'OTP invalid');
    }
  },
);

// Get Profile Thunk
export const fetchProfileThunk = createAsyncThunk(
  'auth/profile',
  async (_, { rejectWithValue }) => {
    try {
      const res = await authService.getProfile();
      return res.data;
    } catch {
      return rejectWithValue('Failed to load profile');
    }
  },
);

// Logout Thunk
export const logoutThunk = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
  localStorage.removeItem('accessToken');
  return true;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    refreshToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(loginThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      localStorage.setItem('accessToken', action.payload.accessToken);
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Register
    builder.addCase(registerThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.isOtpStep = true;
      state.registerContact = action.meta.arg.email || action.meta.arg.phone || null;
    });
    builder.addCase(registerThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Verify OTP
    builder.addCase(verifyOtpThunk.fulfilled, (state) => {
      state.isOtpStep = false;
    });

    // Fetch profile
    builder.addCase(fetchProfileThunk.fulfilled, (state, action) => {
      state.user = action.payload;
    });

    // Logout
    builder.addCase(logoutThunk.fulfilled, () => initialState);
  },
});

export const { refreshToken, setUser } = authSlice.actions;
export default authSlice.reducer;
