import { lazy } from "react";

export const DefaultLayout = lazy(() => import("./DefaultLayout"));
export const AuthLayout = lazy(() => import("./AuthLayout"));
export const ClassLayout = lazy(() => import("./ClassLayout"));
export const QuizLayout = lazy(() => import("./QuizLayout"));
export const AdminLayout = lazy(() => import("./AdminLayout"));
