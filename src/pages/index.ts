import { lazy } from 'react';

// ===== PUBLIC =====
export const Home = lazy(() => import('./public/Home'));
export const Contact = lazy(() => import('./public/Contact'));

// ===== ERROR =====
export const NotFound = lazy(() => import('./error/NotFound'));
export const Unauthorized = lazy(() => import('./error/Unauthorized'));

// ===== AUTH =====
export const Login = lazy(() => import('./auth/Login'));
export const Register = lazy(() => import('./auth/Register'));

// ===== DASHBOARD =====
export const Dashboard = lazy(() => import('./dashboard/Dashboard'));
export const Profile = lazy(() => import('./dashboard/Profile'));
export const Random = lazy(() => import('./dashboard/Random'));

// ===== CLASS =====
export const ClassDetail = lazy(() => import('./class/ClassDetail'));
// Assignment
export const AssignmentList = lazy(() => import('./class/assignment/AssignmentList'));
export const AssignmentDetail = lazy(() => import('./class/assignment/AssignmentDetail'));
// Document
export const DocumentList = lazy(() => import('./class/document/DocumentList'));
export const DocumentDetail = lazy(() => import('./class/document/DocumentDetail'));
// Forum
export const ForumList = lazy(() => import('./class/forum/ForumList'));
export const ForumDetail = lazy(() => import('./class/forum/ForumDetail'));
// General
export const ClassMembers = lazy(() => import('./class/general/ClassMembers'));
export const ClassGrade = lazy(() => import('./class/general/ClassGrade'));
// Quiz
export const QuizList = lazy(() => import('./class/quiz/QuizList'));
// Survey
export const SurveyList = lazy(() => import('./class/survey/SurveyList'));
export const SurveyDetail = lazy(() => import('./class/survey/SurveyDetail'));

// ===== QUIZ =====
export const QuizDashboard = lazy(() => import('./quiz/QuizDashboard'));
export const QuizDetail = lazy(() => import('./quiz/QuizDetail'));
export const QuizPlay = lazy(() => import('./quiz/QuizPlay'));
export const QuizResult = lazy(() => import('./quiz/QuizResult'));
export const ResultDashboard = lazy(() => import('./quiz/ResultDashboard'));

// ===== ADMIN =====
export const AdminDashboard = lazy(() => import('./admin/AdminDashboard'));
export const ClassManagement = lazy(() => import('./admin/ClassManagement'));
export const QuizManagement = lazy(() => import('./admin/QuizManagement'));
export const UserManagement = lazy(() => import('./admin/UserManagement'));
