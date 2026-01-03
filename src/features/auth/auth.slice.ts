import { type PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { LoginDto, RegisterDto } from '@/types/auth.type';
import type { User } from '@/types/users.type';
import { authService } from '@/services/auth.service';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  error?: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  loading: false,
  error: null,
};

// Login Thunk
export const loginThunk = createAsyncThunk(
  'auth/login',
  async (payload: LoginDto, { rejectWithValue }) => {
    try {
      const res = await authService.login(payload);
      return res.data;
    } catch {
      return rejectWithValue('Login failed');
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
    } catch {
      return rejectWithValue('Register failed');
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
      console.log('Payload:', action.payload);
      state.loading = false;
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Register
    builder.addCase(registerThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerThunk.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(registerThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
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
