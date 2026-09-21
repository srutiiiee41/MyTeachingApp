// src/pages/teacher/MyCourses.jsx
import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { fetchMyCourses, publishCourse } from "../../api/courseApi";
import { Link } from "react-router-dom";

export default function MyCourses() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  const [busyId, setBusyId] = useState(null);

  const load = async () => {
    setErr("");
    try {
      const res = await fetchMyCourses();
      setData(res);
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || "Failed to load courses");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const items = Array.isArray(data) ? data : data?.content || data?.data || [];

  const togglePublish = async (courseId) => {
    setErr("");
    try {
      setBusyId(courseId);
      await publishCourse(courseId);
      await load();
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || "Publish action failed");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 1000, margin: "0 auto" }}>
      <h2 style={{ marginBottom: 8 }}>My Courses</h2>

      {!data && !err && <Loading text="Loading your courses..." />}
      {err && <p style={{ color: "crimson" }}>{err}</p>}

      {data && !items.length && (
        <div style={emptyBox}>
          <div style={{ fontWeight: 900 }}>No courses yet</div>
          <p style={{ color: "#666", marginTop: 6 }}>
            Create your first course from <Link to="/teacher/create-course">Create Course</Link>.
          </p>
        </div>
      )}

      {!!items.length && (
        <div style={{ display: "grid", gap: 12 }}>
          {items.map((c) => {
            const courseId = c.courseId || c.id;
            const title = c.title;
            const desc = c.description;
            const price = c.price;
            const isActive = c.isActive ?? c.active ?? c.published; // best-effort

            return (
              <div key={courseId} style={card}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: 16 }}>{title}</div>
                    {desc && <div style={{ color: "#666", marginTop: 6 }}>{desc}</div>}
                    {price !== undefined && <div style={{ marginTop: 8, fontWeight: 800 }}>Price: {price}</div>}
                    <div style={{ marginTop: 8, fontSize: 13, color: isActive ? "green" : "#999" }}>
                      Status: {isActive ? "Published" : "Not Published"}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 10, alignItems: "start", flexWrap: "wrap" }}>
                    <button
                      onClick={() => togglePublish(courseId)}
                      disabled={busyId === courseId}
                      style={btn}
                    >
                      {busyId === courseId ? "Updating..." : "Toggle Publish"}
                    </button>

                    <Link to={`/teacher/course/${courseId}/students`} style={pillLink}>
                      Students
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const card = {
  background: "#fff",
  border: "1px solid #eee",
  borderRadius: 14,
  padding: 14,
};

const emptyBox = {
  background: "#fff",
  border: "1px solid #eee",
  borderRadius: 14,
  padding: 16,
};

const btn = {
  padding: "10px 14px",
  borderRadius: 12,
  border: "1px solid #ddd",
  background: "#fff",
  cursor: "pointer",
  fontWeight: 900,
};

const pillLink = {
  alignSelf: "start",
  padding: "10px 12px",
  borderRadius: 999,
  border: "1px solid #111",
  textDecoration: "none",
  fontWeight: 900,
  color: "#111",
};
