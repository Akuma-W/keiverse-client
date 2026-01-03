import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Enrollment, QueryEnrollmentParams } from '@/types/enrollments.type';
import { enrollmentsService } from '@/services/enrollments.service';

interface EnrollmentState {
  list: Enrollment[];
  myEnrollments: Enrollment[];
  loading: boolean;
}

const initialState: EnrollmentState = {
  list: [],
  myEnrollments: [],
  loading: false,
};

// Fetch Enrollments Thunk
export const fetchEnrollmentsThunk = createAsyncThunk(
  'enrollments/getAll',
  async (params: QueryEnrollmentParams) => {
    return await enrollmentsService.getAll(params);
  },
);

// Fetch My Enrollments Thunk
export const fetchMyEnrollmentsThunk = createAsyncThunk('enrollments/getMine', async () => {
  return await enrollmentsService.getMine();
});

const enrollmentsSlice = createSlice({
  name: 'enrollments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEnrollmentsThunk.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    builder.addCase(fetchMyEnrollmentsThunk.fulfilled, (state, action) => {
      state.myEnrollments = action.payload;
    });
  },
});

export default enrollmentsSlice.reducer;
