// src/pages/teacher/CreateCourse.jsx
import React, { useState } from "react";
import Loading from "../../components/Loading";
import { createCourse } from "../../api/courseApi";
import { useNavigate } from "react-router-dom";

export default function CreateCourse() {
  const nav = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setMsg("");

    if (!title.trim()) return setErr("Title is required");
    if (!description.trim()) return setErr("Description is required");
    const p = Number(price);
    if (Number.isNaN(p) || p < 0) return setErr("Valid price is required");

    try {
      setBusy(true);
      await createCourse({ title: title.trim(), description: description.trim(), price: p });
      setMsg("Course created ✅");
      setTimeout(() => nav("/teacher/my-courses"), 400);
    } catch (e2) {
      setErr(e2?.response?.data?.message || e2.message || "Failed to create course");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 720, margin: "0 auto" }}>
      <h2>Create Course</h2>

      <div style={card}>
        <form onSubmit={onSubmit}>
          <label style={label}>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Spring Boot Mastery"
            style={input}
          />

          <label style={label}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What will students learn?"
            rows={5}
            style={{ ...input, resize: "vertical" }}
          />

          <label style={label}>Price</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="e.g. 4999"
            style={input}
          />

          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            <button type="submit" disabled={busy} style={btnPrimary}>
              Create
            </button>
          </div>

          {busy && <Loading text="Creating course..." />}
          {err && <p style={{ color: "crimson", marginTop: 10 }}>{err}</p>}
          {msg && <p style={{ color: "green", marginTop: 10 }}>{msg}</p>}
        </form>
      </div>
    </div>
  );
}

const card = {
  background: "#fff",
  border: "1px solid #eee",
  borderRadius: 14,
  padding: 16,
};

const label = { display: "block", fontWeight: 800, marginTop: 10, marginBottom: 6 };

const input = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #ddd",
  borderRadius: 10,
  outline: "none",
};

const btnPrimary = {
  padding: "10px 14px",
  borderRadius: 12,
  border: "1px solid #111",
  background: "#111",
  color: "#fff",
  cursor: "pointer",
  fontWeight: 900,
};
