import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { QueryUsersDto, User } from '@/types/users.type';
import { usersService } from '@/services/users.service';

interface UsersState {
  list: User[];
  current?: User;
  loading: boolean;
}

const initialState: UsersState = {
  list: [],
  loading: false,
};

// Fetch users Thunk
export const fetchUsersThunk = createAsyncThunk('users/getAll', async (params: QueryUsersDto) =>
  usersService.getAll(params),
);

// Fetch user by id Thunk
export const fetchUserByIdThunk = createAsyncThunk('users/getOne', async (id: number) =>
  usersService.getOne(id),
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsersThunk.fulfilled, (state, action) => {
      state.list = action.payload;
    });

    builder.addCase(fetchUserByIdThunk.fulfilled, (state, action) => {
      state.current = action.payload;
    });
  },
});

export default usersSlice.reducer;
