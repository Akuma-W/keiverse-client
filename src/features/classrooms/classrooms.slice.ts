import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Classroom, CreateClassroomDto, QueryClassroomParams } from '@/types/classrooms.type';
import { classroomsService } from '@/services/classrooms.service';

interface ClassroomsState {
  list: Classroom[];
  myClassrooms: Classroom[];
  current?: Classroom;
  loading: boolean;
}

const initialState: ClassroomsState = {
  list: [],
  myClassrooms: [],
  loading: false,
};

// Fetch classrooms Thunk
export const fetchClassroomsThunk = createAsyncThunk(
  'classrooms/getAll',
  async (params: QueryClassroomParams) => {
    const res = await classroomsService.getAll(params);
    return res.data; // <-- ALWAYS return res.data
  },
);

// Fetch my classrooms
export const fetchMyClassroomsThunk = createAsyncThunk('classrooms/getMine', async () => {
  const res = await classroomsService.getMine();
  return res.data.data; // <-- RETURN ARRAY
});

// Fetch classroom by id
export const fetchClassroomByIdThunk = createAsyncThunk(
  'classrooms/getById',
  async (id: number) => {
    const res = await classroomsService.getById(id);
    return res.data; // <-- ALWAYS return res.data
  },
);

// Create classroom
export const createClassroomThunk = createAsyncThunk(
  'classrooms/create',
  async (data: CreateClassroomDto) => {
    const res = await classroomsService.create(data);
    return res.data; // <-- ALWAYS return res.data
  },
);

const classroomsSlice = createSlice({
  name: 'classrooms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch classrooms
    builder.addCase(fetchClassroomsThunk.fulfilled, (state, action) => {
      state.list = action.payload;
      state.loading = false;
    });

    builder.addCase(fetchMyClassroomsThunk.fulfilled, (state, action) => {
      state.myClassrooms = action.payload;
    });

    builder.addCase(fetchClassroomByIdThunk.fulfilled, (state, action) => {
      state.current = action.payload;
    });

    builder.addCase(createClassroomThunk.fulfilled, (state, action) => {
      state.myClassrooms.push(action.payload);
    });
  },
});

export default classroomsSlice.reducer;
