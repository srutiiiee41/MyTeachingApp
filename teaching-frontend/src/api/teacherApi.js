import { axiosClient } from "./axiosClient";

export async function fetchCourseStudents(courseId) {
  const { data } = await axiosClient.get(`/teacher/courses/${courseId}/students`);
  return data;
}
