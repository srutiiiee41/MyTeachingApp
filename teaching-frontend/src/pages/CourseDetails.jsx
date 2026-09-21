import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCourseById } from "../api/courseApi";
import { enrollCourse } from "../api/enrollmentApi";
import { useAuth } from "../auth/AuthContext";

export default function CourseDetails() {
  const { courseId } = useParams();
  const { roles, isAuthed } = useAuth();

  const [course, setCourse] = useState(null);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    fetchCourseById(courseId)
      .then(setCourse)
      .catch((e) => setErr(e?.response?.data?.message || e.message));
  }, [courseId]);

  const canEnroll = isAuthed && roles.includes("STUDENT");

  const onEnroll = async () => {
    setErr(""); setMsg("");
    try {
      await enrollCourse({ courseId: Number(courseId), payment: "UPI" });
      setMsg("Enrolled successfully ✅");
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || "Enroll failed");
    }
  };

  return (
    <div style={{ padding: 24 }}>
      {err && <p style={{ color: "crimson" }}>{err}</p>}
      {!course ? <p>Loading...</p> : (
        <>
          <h2>{course.title}</h2>
          <p>{course.description}</p>
          <p><b>Price:</b> {course.price}</p>

          {canEnroll && <button onClick={onEnroll}>Enroll</button>}
          {msg && <p style={{ color: "green" }}>{msg}</p>}
        </>
      )}
    </div>
  );
}
