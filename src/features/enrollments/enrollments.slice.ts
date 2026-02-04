import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type {
  CreateEnrollmentDto,
  Enrollment,
  UpdateEnrollmentDto,
} from '@/types/enrollments.type';
import { enrollmentsService } from '@/services/enrollments.service';

/* =====================
   State
===================== */

interface EnrollmentsState {
  myEnrollments: Enrollment[];
  list: Enrollment[];
  current?: Enrollment;
  loading: boolean;
  error?: string;
}

const initialState: EnrollmentsState = {
  myEnrollments: [],
  list: [],
  loading: false,
};

/* =====================
   Thunks
===================== */

// 1️⃣ Lấy enrollment của user hiện tại (Dashboard)
export const fetchMyEnrollmentsThunk = createAsyncThunk(
  'enrollments/fetchMe',
  async (status?: string) => {
    const res = await enrollmentsService.getMyClass(status);
    return res.data;
  },
);

// 2️⃣ Tham gia lớp
export const joinEnrollmentThunk = createAsyncThunk(
  'enrollments/join',
  async (data: { userId: number; classId: number }) => {
    const payload: CreateEnrollmentDto = data;
    const res = await enrollmentsService.create(payload);
    return res;
  },
);

// 3️⃣ Lấy enrollment theo lớp (Teacher)
export const fetchEnrollmentsByClassThunk = createAsyncThunk(
  'enrollments/fetchByClass',
  async ({ classId, status }: { classId: number; status?: string }) => {
    const res = await enrollmentsService.getByClass(classId, status);
    return res.data;
  },
);

// 4️⃣ Duyệt enrollment
export const approveEnrollmentThunk = createAsyncThunk(
  'enrollments/approve',
  async (id: number) => {
    const res = await enrollmentsService.approve(id);
    return res.data;
  },
);

// 5️⃣ Từ chối enrollment
export const rejectEnrollmentThunk = createAsyncThunk('enrollments/reject', async (id: number) => {
  const res = await enrollmentsService.reject(id);
  return res.data;
});

// 6️⃣ Update enrollment (nếu cần)
export const updateEnrollmentThunk = createAsyncThunk(
  'enrollments/update',
  async ({ id, data }: { id: number; data: UpdateEnrollmentDto }) => {
    const res = await enrollmentsService.update(id, data);
    return res.data;
  },
);

/* =====================
   Slice
===================== */

const enrollmentsSlice = createSlice({
  name: 'enrollments',
  initialState,
  reducers: {
    clearEnrollments(state) {
      state.myEnrollments = [];
      state.list = [];
      state.current = undefined;
      state.error = undefined;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      /* -------- fetch my enrollments -------- */
      .addCase(fetchMyEnrollmentsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyEnrollmentsThunk.fulfilled, (state, action) => {
        state.myEnrollments = action.payload;
        state.loading = false;
      })
      .addCase(fetchMyEnrollmentsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      /* -------- join by code -------- */
      .addCase(joinEnrollmentThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(joinEnrollmentThunk.fulfilled, (state, action) => {
        // status = pending → vẫn hiển thị ở dashboard (chờ duyệt)
        state.myEnrollments.unshift(action.payload);
        state.loading = false;
      })
      .addCase(joinEnrollmentThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      /* -------- fetch by class -------- */
      .addCase(fetchEnrollmentsByClassThunk.fulfilled, (state, action) => {
        state.list = action.payload;
      })

      /* -------- approve / reject -------- */
      .addCase(approveEnrollmentThunk.fulfilled, (state, action) => {
        const idx = state.myEnrollments.findIndex((e) => e.id === action.payload.id);
        if (idx !== -1) state.myEnrollments[idx] = action.payload;
      })
      .addCase(rejectEnrollmentThunk.fulfilled, (state, action) => {
        const idx = state.myEnrollments.findIndex((e) => e.id === action.payload.id);
        if (idx !== -1) state.myEnrollments[idx] = action.payload;
      });
  },
});

export const { clearEnrollments } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
