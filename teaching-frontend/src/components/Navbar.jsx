// src/components/Navbar.jsx
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";

export default function Navbar() {
  const { isAuthed, roles, logout, user } = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav("/login");
  };

  const linkStyle = ({ isActive }) => ({
    padding: "8px 10px",
    borderRadius: 8,
    textDecoration: "none",
    color: isActive ? "#111" : "#444",
    background: isActive ? "#f2f2f2" : "transparent",
    fontWeight: isActive ? 600 : 500,
  });

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "#fff",
        borderBottom: "1px solid #eee",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <Link to="/" style={{ textDecoration: "none", color: "#111", fontWeight: 800 }}>
          TeachingApp
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <NavLink to="/courses" style={linkStyle}>
            Courses
          </NavLink>

          {isAuthed && roles?.includes("STUDENT") && (
            <NavLink to="/student/enrolled" style={linkStyle}>
              My Enrollments
            </NavLink>
          )}

          {isAuthed && roles?.includes("TEACHER") && (
            <>
              <NavLink to="/teacher" style={linkStyle}>
                Teacher
              </NavLink>
              <NavLink to="/teacher/my-courses" style={linkStyle}>
                My Courses
              </NavLink>
              <NavLink to="/teacher/create-course" style={linkStyle}>
                Create Course
              </NavLink>
            </>
          )}

          {isAuthed && roles?.includes("ADMIN") && (
            <NavLink to="/admin" style={linkStyle}>
              Admin
            </NavLink>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {!isAuthed ? (
            <>
              <NavLink to="/login" style={linkStyle}>
                Login
              </NavLink>
              <NavLink to="/register" style={linkStyle}>
                Register
              </NavLink>
            </>
          ) : (
            <>
              <div style={{ fontSize: 13, color: "#333", textAlign: "right" }}>
                <div style={{ fontWeight: 700 }}>{user?.email || "User"}</div>
                <div style={{ color: "#777" }}>{roles?.join(", ")}</div>
              </div>
              <button
                onClick={handleLogout}
                style={{
                  border: "1px solid #ddd",
                  background: "#fff",
                  padding: "8px 12px",
                  borderRadius: 10,
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
