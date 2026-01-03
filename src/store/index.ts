import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/auth.slice';
import classroomsReducer from '@/features/classrooms/classrooms.slice';
import enrollmentsReducer from '@/features/enrollments/enrollments.slice';
import rolesReducer from '@/features/roles/roles.slice';
import usersReducer from '@/features/users/users.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    classrooms: classroomsReducer,
    enrollments: enrollmentsReducer,
    users: usersReducer,
    roles: rolesReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
