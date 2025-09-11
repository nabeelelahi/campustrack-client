import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./app/Home";
import Settings from "./app/Setting";
import Login from "./app/Auth/login";
import Forgotpassword from "./app/Auth/forgot-password";
import Otp from "./app/Auth/otp";
import Resetpassword from "./app/Auth/reset-password";
import NotificationManagment from "./app/NotificationManagment";
import UserManagment from "./app/UserManagment";
import Article from "./app/ArticleManagement";
import Class from "./app/ClassManagement";
import DocGuide from "./app/DocGuideManagement";
import Passport from "./app/PassportManagement";
import QuestionAnswer from "./app/QuestionAnswer";
import TeacherDashboard from "./app/TeacherDashboard";
import ClassDetails from "./app/ClassDetails";
import StaffDashboard from "./app/StaffDashboard";
import ParentDashboard from "./app/ParentDashboard";
import StudentDashboard from "./app/StudentDashboard";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to='/login' />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<Forgotpassword />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/reset-password" element={<Resetpassword />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
      <Route path="/staff/dashboard" element={<StaffDashboard />} />
      <Route path="/parent/dashboard" element={<ParentDashboard />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/users" element={<UserManagment />} />
      <Route path="/articles" element={<Article />} />
      <Route path="/classes" element={<Class />} />
      <Route path="/class/:_id" element={<ClassDetails />} />
      <Route path="/doc-guide" element={<DocGuide />} />
      <Route path="/passports" element={<Passport />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/notification" element={<NotificationManagment />} />
      <Route path="/classes/:_id" element={<QuestionAnswer />} />
    </Routes>
  );
};

export default App;
