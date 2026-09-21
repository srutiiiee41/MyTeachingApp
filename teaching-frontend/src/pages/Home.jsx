import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Home() {
  const { isAuthed, roles, logout } = useAuth();

  return (
    <div style={{ padding: 24 }}>
      <h1>Teaching App</h1>

      <p>
        <Link to="/courses">Browse Courses</Link>
      </p>

      {!isAuthed ? (
        <p>
          <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
        </p>
      ) : (
        <>
          <p>Roles: {roles.join(", ")}</p>
          <button onClick={logout}>Logout</button>
          <div style={{ marginTop: 16 }}>
            {roles.includes("STUDENT") && <p><Link to="/student/enrolled">My Enrolled Courses</Link></p>}
            {roles.includes("TEACHER") && <p><Link to="/teacher">Teacher Dashboard</Link></p>}
            {roles.includes("ADMIN") && <p><Link to="/admin">Admin Dashboard</Link></p>}
          </div>
        </>
      )}
    </div>
  );
}
