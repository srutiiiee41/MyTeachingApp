import React from "react";
import { Routes, Route } from "react-router-dom";

import RequireAuth from "./auth/RequireAuth";
import RequireRole from "./auth/RequireRole";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";

import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import CreateCourse from "./pages/teacher/CreateCourse";
import MyCourses from "./pages/teacher/MyCourses";
import CourseStudents from "./pages/teacher/CourseStudents";

import EnrolledCourses from "./pages/student/EnrolledCourses";

import AdminDashboard from "./pages/admin/AdminDashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:courseId" element={<CourseDetails />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected */}
      <Route element={<RequireAuth />}>
        <Route element={<RequireRole allowed={["STUDENT"]} />}>
          <Route path="/student/enrolled" element={<EnrolledCourses />} />
        </Route>

        <Route element={<RequireRole allowed={["TEACHER"]} />}>
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/teacher/create-course" element={<CreateCourse />} />
          <Route path="/teacher/my-courses" element={<MyCourses />} />
          <Route path="/teacher/course/:courseId/students" element={<CourseStudents />} />
        </Route>

        <Route element={<RequireRole allowed={["ADMIN"]} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}
