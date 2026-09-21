// src/pages/admin/AdminDashboard.jsx
import React, { useState } from "react";
import Loading from "../../components/Loading";
import { makeAdmin, makeTeacher } from "../../api/adminApi";

export default function AdminDashboard() {
  const [userId, setUserId] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const promote = async (type) => {
    setErr("");
    setMsg("");

    const id = String(userId).trim();
    if (!id) {
      setErr("Please enter a userId first.");
      return;
    }

    try {
      setBusy(true);
      if (type === "teacher") {
        await makeTeacher(id);
        setMsg(`User ${id} promoted to TEACHER ✅`);
      } else {
        await makeAdmin(id);
        setMsg(`User ${id} promoted to ADMIN ✅`);
      }
      setUserId("");
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || "Action failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h2 style={{ marginBottom: 8 }}>Admin Dashboard</h2>
      <p style={{ color: "#666", marginTop: 0 }}>
        Promote users by userId (until you add a “list users” endpoint).
      </p>

      <div
        style={{
          border: "1px solid #eee",
          borderRadius: 14,
          padding: 16,
          background: "#fff",
        }}
      >
        <label style={{ display: "block", fontWeight: 700, marginBottom: 6 }}>
          User ID
        </label>
        <input
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="e.g. 12"
          style={{
            width: "100%",
            padding: "10px 12px",
            border: "1px solid #ddd",
            borderRadius: 10,
            outline: "none",
          }}
        />

        <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
          <button
            onClick={() => promote("teacher")}
            disabled={busy}
            style={btnStyle}
          >
            Make Teacher
          </button>
          <button
            onClick={() => promote("admin")}
            disabled={busy}
            style={{ ...btnStyle, borderColor: "#111", background: "#111", color: "#fff" }}
          >
            Make Admin
          </button>
        </div>

        {busy && <Loading text="Updating role..." />}
        {err && <p style={{ color: "crimson", marginTop: 10 }}>{err}</p>}
        {msg && <p style={{ color: "green", marginTop: 10 }}>{msg}</p>}
      </div>

      <div style={{ marginTop: 16, fontSize: 13, color: "#666" }}>
        <div style={{ fontWeight: 700, marginBottom: 6 }}>Tip:</div>
        <ul style={{ marginTop: 0 }}>
          <li>
            Get userId from your database (Users table) or from your signup response if it returns it.
          </li>
          <li>
            If you want, I’ll add an admin endpoint like <code>GET /admin/users</code> to list users with pagination.
          </li>
        </ul>
      </div>
    </div>
  );
}

const btnStyle = {
  padding: "10px 14px",
  borderRadius: 12,
  border: "1px solid #ddd",
  background: "#fff",
  cursor: "pointer",
  fontWeight: 800,
};
