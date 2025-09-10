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

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to='/login' />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<Forgotpassword />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/reset-password" element={<Resetpassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users" element={<UserManagment />} />
      <Route path="/articles" element={<Article />} />
      <Route path="/classes" element={<Class />} />
      <Route path="/doc-guide" element={<DocGuide />} />
      <Route path="/passports" element={<Passport />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/notification" element={<NotificationManagment />} />
      <Route path="/classes/:_id" element={<QuestionAnswer />} />
    </Routes>
  );
};

export default App;
