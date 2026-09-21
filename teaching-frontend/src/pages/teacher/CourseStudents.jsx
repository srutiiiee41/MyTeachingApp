// src/pages/teacher/CourseStudents.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { fetchCourseStudents } from "../../api/teacherApi";

export default function CourseStudents() {
  const { courseId } = useParams();
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  const load = async () => {
    setErr("");
    try {
      const res = await fetchCourseStudents(courseId);
      setData(res);
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || "Failed to load students");
    }
  };

  useEffect(() => {
    load();
  }, [courseId]);

  const items = Array.isArray(data) ? data : data?.content || data?.data || [];

  return (
    <div style={{ padding: 24, maxWidth: 1000, margin: "0 auto" }}>
      <h2 style={{ marginBottom: 8 }}>Course Students</h2>
      <p style={{ color: "#666", marginTop: 0 }}>Course ID: {courseId}</p>

      {!data && !err && <Loading text="Loading students..." />}
      {err && <p style={{ color: "crimson" }}>{err}</p>}

      {data && !items.length && (
        <div style={emptyBox}>
          <div style={{ fontWeight: 900 }}>No students enrolled yet</div>
          <p style={{ color: "#666", marginTop: 6 }}>
            Once students enroll, you’ll see them here.
          </p>
        </div>
      )}

      {!!items.length && (
        <div style={{ display: "grid", gap: 12 }}>
          {items.map((s, idx) => {
            const name = s?.name || s?.studentName || s?.fullName || "Student";
            const email = s?.email || s?.studentEmail || "";
            const id = s?.studentId || s?.id || idx + 1;

            return (
              <div key={id} style={card}>
                <div style={{ fontWeight: 900 }}>{name}</div>
                {email && <div style={{ color: "#666", marginTop: 6 }}>{email}</div>}
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
