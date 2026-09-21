// src/pages/teacher/TeacherDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function TeacherDashboard() {
  return (
    <div style={{ padding: 24, maxWidth: 1000, margin: "0 auto" }}>
      <h2 style={{ marginBottom: 8 }}>Teacher Dashboard</h2>
      <p style={{ color: "#666", marginTop: 0 }}>
        Manage your courses, publish them, and view enrolled students.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
        <DashCard
          title="Create Course"
          desc="Add a new course with title, description and price."
          to="/teacher/create-course"
        />
        <DashCard
          title="My Courses"
          desc="View and manage your existing courses."
          to="/teacher/my-courses"
        />
      </div>
    </div>
  );
}

function DashCard({ title, desc, to }) {
  return (
    <Link to={to} style={cardLink}>
      <div style={{ fontWeight: 900, fontSize: 16 }}>{title}</div>
      <div style={{ color: "#666", marginTop: 6 }}>{desc}</div>
      <div style={{ marginTop: 10, fontWeight: 900 }}>Open →</div>
    </Link>
  );
}

const cardLink = {
  display: "block",
  background: "#fff",
  border: "1px solid #eee",
  borderRadius: 14,
  padding: 16,
  textDecoration: "none",
  color: "#111",
};
