import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { QueryRolesDto, Role } from '@/types/roles.type';
import { rolesService } from '@/services/roles.service';

interface RolesState {
  list: Role[];
  current?: Role;
  loading: boolean;
}

const initialState: RolesState = {
  list: [],
  loading: false,
};

export const fetchRolesThunk = createAsyncThunk('roles/getAll', async (params: QueryRolesDto) =>
  rolesService.getAll(params),
);

export const fetchRoleByIdThunk = createAsyncThunk('roles/getOne', async (id: number) =>
  rolesService.getOne(id),
);

const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRolesThunk.fulfilled, (state, action) => {
      state.list = action.payload;
    });

    builder.addCase(fetchRoleByIdThunk.fulfilled, (state, action) => {
      state.current = action.payload;
    });
  },
});

export default rolesSlice.reducer;
