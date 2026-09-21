// src/pages/student/EnrolledCourses.jsx
import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { fetchMyEnrolledCourses } from "../../api/enrollmentApi";
import { Link } from "react-router-dom";

export default function EnrolledCourses() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  const load = async () => {
    setErr("");
    try {
      const res = await fetchMyEnrolledCourses();
      setData(res);
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || "Failed to load enrollments");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const items = Array.isArray(data) ? data : data?.content || data?.data || [];

  return (
    <div style={{ padding: 24, maxWidth: 1000, margin: "0 auto" }}>
      <h2 style={{ marginBottom: 8 }}>My Enrolled Courses</h2>

      {!data && !err && <Loading text="Loading enrolled courses..." />}
      {err && <p style={{ color: "crimson" }}>{err}</p>}

      {data && !items.length && (
        <div style={emptyBox}>
          <div style={{ fontWeight: 800 }}>No enrollments yet</div>
          <p style={{ marginTop: 6, color: "#666" }}>
            Go to <Link to="/courses">Courses</Link> and enroll in one.
          </p>
        </div>
      )}

      {!!items.length && (
        <div style={{ display: "grid", gap: 12 }}>
          {items.map((row, idx) => {
            // Best effort mapping (depends on your backend response shape)
            const course = row?.course || row?.courseDto || row;
            const courseId = course?.courseId || course?.id || row?.courseId;
            const title = course?.title || row?.title || `Course #${courseId ?? idx + 1}`;
            const description = course?.description || row?.description || "";
            const price = course?.price ?? row?.price;

            return (
              <div key={courseId ?? idx} style={card}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: 16 }}>{title}</div>
                    {description && <div style={{ color: "#666", marginTop: 6 }}>{description}</div>}
                    {price !== undefined && price !== null && (
                      <div style={{ marginTop: 8, fontWeight: 800 }}>Price: {price}</div>
                    )}
                  </div>

                  {courseId != null && (
                    <Link to={`/courses/${courseId}`} style={pillLink}>
                      View
                    </Link>
                  )}
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

const pillLink = {
  alignSelf: "start",
  padding: "8px 10px",
  borderRadius: 999,
  border: "1px solid #ddd",
  textDecoration: "none",
  fontWeight: 800,
  color: "#111",
};
