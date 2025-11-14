import {
  AdminDashboard,
  AssignmentDetail,
  AssignmentList,
  ClassDetail,
  ClassGrade,
  ClassManagement,
  ClassMembers,
  Contact,
  Dashboard,
  DocumentDetail,
  DocumentList,
  ForumDetail,
  ForumList,
  Home,
  Login,
  NotFound,
  Profile,
  QuizDashboard,
  QuizDetail,
  QuizList,
  QuizManagement,
  QuizPlay,
  QuizResult,
  Random,
  Register,
  ResultDashboard,
  SurveyDetail,
  SurveyList,
  UserManagement,
} from "@/pages";
import { Navigate, createBrowserRouter } from "react-router-dom";
import { AdminLayout, AuthLayout, ClassLayout, DefaultLayout, QuizLayout } from "../layouts";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    path: "auth",
    children: [
      { index: true, element: <Navigate to="login" replace /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    element: <DefaultLayout />,
    path: "/",
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "contact", element: <Contact /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "profile", element: <Profile /> },
      { path: "random", element: <Random /> },
      {
        path: "class/:classId",
        element: <ClassLayout />,
        children: [
          { index: true, element: <ClassDetail /> },
          { path: "members", element: <ClassMembers /> },
          { path: "grade", element: <ClassGrade /> },
          { path: "assignments", element: <AssignmentList /> },
          { path: "assignments/:assignId", element: <AssignmentDetail /> },
          { path: "documents", element: <DocumentList /> },
          { path: "documents/:documentId", element: <DocumentDetail /> },
          { path: "forum", element: <ForumList /> },
          { path: "forum/:postId", element: <ForumDetail /> },
          { path: "surveys", element: <SurveyList /> },
          { path: "surveys/:surveyId", element: <SurveyDetail /> },
          { path: "quizzes", element: <QuizList /> },
        ],
      },
      {
        path: "/quiz",
        element: <QuizLayout />,
        children: [
          { index: true, element: <QuizDashboard /> },
          { path: ":quizId", element: <QuizDetail /> },
          { path: ":quizId/play", element: <QuizPlay /> },
          { path: ":quizId/result", element: <QuizResult /> },
          { path: ":quizId/results", element: <ResultDashboard /> },
        ],
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      {
        path: "users",
        children: [
          { index: true, element: <UserManagement /> },
          { path: ":userId", element: <UserManagement /> },
        ],
      },
      {
        path: "classes",
        children: [
          { index: true, element: <ClassManagement /> },
          { path: ":classId", element: <ClassManagement /> },
        ],
      },
      {
        path: "quizzes",
        children: [
          { index: true, element: <QuizManagement /> },
          { path: ":quizId", element: <QuizManagement /> },
        ],
      },
    ],
  },
]);
