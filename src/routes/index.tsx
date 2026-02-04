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
  Unauthorized,
  UserManagement,
} from '@/pages';
import { createBrowserRouter } from 'react-router-dom';
import { AdminLayout, AuthLayout, ClassLayout, DefaultLayout, QuizLayout } from '../layouts';
import ProtectedRoute from './ProtectedRoute';

export const router = createBrowserRouter([
  { errorElement: <NotFound /> },
  {
    element: <DefaultLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'contact', element: <Contact /> },
      { path: 'random', element: <Random /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      { path: 'unauthorized', element: <Unauthorized /> },
      {
        element: <DefaultLayout />,
        children: [
          { path: 'profile', element: <Profile /> },
          { path: 'profile/:id', element: <Profile /> },
          {
            path: '',
            element: <ClassLayout />,
            children: [
              { path: 'dashboard', element: <Dashboard /> },
              {
                path: 'class/:classId',
                children: [
                  { index: true, element: <ClassDetail /> },
                  { path: 'members', element: <ClassMembers /> },
                  { path: 'grade', element: <ClassGrade /> },
                  { path: 'assignments', element: <AssignmentList /> },
                  { path: 'assignment/:assignId', element: <AssignmentDetail /> },
                  { path: 'documents', element: <DocumentList /> },
                  { path: 'document/:documentId', element: <DocumentDetail /> },
                  { path: 'forum', element: <ForumList /> },
                  { path: 'forum/:postId', element: <ForumDetail /> },
                  { path: 'surveys', element: <SurveyList /> },
                  { path: 'survey/:surveyId', element: <SurveyDetail /> },
                  { path: 'quizzes', element: <QuizList /> },
                ],
              },
            ],
          },
          {
            path: 'quiz',
            element: <QuizLayout />,
            children: [
              { index: true, element: <QuizDashboard /> },
              { path: ':quizId', element: <QuizDetail /> },
              { path: ':quizId/play', element: <QuizPlay /> },
              { path: ':quizId/result', element: <QuizResult /> },
              { path: ':quizId/results', element: <ResultDashboard /> },
            ],
          },
        ],
      },
      {
        path: 'admin',
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboard /> },
          {
            path: 'users',
            children: [
              { index: true, element: <UserManagement /> },
              { path: ':userId', element: <UserManagement /> },
            ],
          },
          {
            path: 'classes',
            children: [
              { index: true, element: <ClassManagement /> },
              { path: ':classId', element: <ClassManagement /> },
            ],
          },
          {
            path: 'quizzes',
            children: [
              { index: true, element: <QuizManagement /> },
              { path: ':quizId', element: <QuizManagement /> },
            ],
          },
        ],
      },
    ],
  },
]);
