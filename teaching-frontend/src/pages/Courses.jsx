import React, { useEffect, useState } from "react";
import { fetchCourses } from "../api/courseApi";
import { Link } from "react-router-dom";

export default function Courses() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    fetchCourses({ page: 0, size: 10, sortBy: "title" })
      .then(setData)
      .catch((e) => setErr(e?.response?.data?.message || e.message));
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2>Courses</h2>
      {err && <p style={{ color: "crimson" }}>{err}</p>}
      {!data ? <p>Loading...</p> : (
        <ul>
          {(data?.content || data || []).map((c) => (
            <li key={c.courseId || c.id}>
              <Link to={`/courses/${c.courseId || c.id}`}>{c.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

