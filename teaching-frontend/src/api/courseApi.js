import { axiosClient } from "./axiosClient";

export async function fetchCourses({ page = 0, size = 10, sortBy = "title" } = {}) {
  const { data } = await axiosClient.get("/course", { params: { page, size, sortBy } });
  return data;
}

export async function fetchCourseById(courseId) {
  const { data } = await axiosClient.get(`/course/${courseId}`);
  return data;
}

// Teacher
export async function createCourse(payload) {
  const { data } = await axiosClient.post("/course/teacher", payload);
  return data;
}

export async function updateCourse(courseId, payload) {
  const { data } = await axiosClient.put(`/course/teacher/${courseId}`, payload);
  return data;
}

export async function publishCourse(courseId) {
  const { data } = await axiosClient.patch(`/course/teacher/${courseId}/publish`);
  return data;
}

export async function fetchMyCourses() {
  const { data } = await axiosClient.get("/course/teacher/my-courses");
  return data;
}
