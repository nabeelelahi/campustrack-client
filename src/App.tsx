import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Settings from "./app/Setting";
import Login from "./app/Auth/login";
import Forgotpassword from "./app/Auth/forgot-password";
import Otp from "./app/Auth/otp";
import Resetpassword from "./app/Auth/reset-password";
import TeacherDashboard from "./app/TeacherDashboard";
import ClassDetails from "./app/ClassDetails";
import StaffDashboard from "./app/StaffDashboard";
import ParentDashboard from "./app/ParentDashboard";
import StudentDashboard from "./app/StudentDashboard";
import StudentDetail from "./app/StudentDetails";
import AdminDashboard from "./app/AdminDashboard";
import StaffDetails from "./app/StaffDetails";
import TeacherDetails from "./app/TeacherDetails";
import ParentDetails from "./app/ParentDetails";
import Scan  from "./app/Scan";
import { QRCodePage } from "./app/QRCode";
import VerifyQR from "./app/VerifyQR";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to='/login' />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<Forgotpassword />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/reset-password" element={<Resetpassword />} />
      <Route path="/super-admin/dashboard" element={<AdminDashboard />} />
      <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
      <Route path="/staff/dashboard" element={<StaffDashboard />} />
      <Route path="/parent/dashboard" element={<ParentDashboard />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/student/:_id" element={<StudentDetail />} />
      <Route path="/parent/:_id" element={<ParentDetails />} />
      <Route path="/teacher/:_id" element={<TeacherDetails />} />
      <Route path="/staff/:_id" element={<StaffDetails />} />
      <Route path="/class/:_id" element={<ClassDetails />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/scan" element={<Scan />} />
      <Route path="/qr-code/:_id" element={<QRCodePage />} />
      <Route path="/qr/:action/:_id" element={<VerifyQR />} />
    </Routes>
  );
};

export default App;
