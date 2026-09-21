import { axiosClient } from "./axiosClient";

export async function enrollCourse({ courseId, payment }) {
  const { data } = await axiosClient.post("/enrollments/enroll", { courseId, payment });
  return data;
}

export async function fetchMyEnrolledCourses() {
  const { data } = await axiosClient.get("/enrollments/my-course");
  return data;
}
