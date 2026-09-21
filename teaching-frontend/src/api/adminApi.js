import { axiosClient } from "./axiosClient";

// These exist in your backend:
export async function makeTeacher(userId) {
  const { data } = await axiosClient.put(`/admin/make-teacher/${userId}`);
  return data;
}
export async function makeAdmin(userId) {
  const { data } = await axiosClient.put(`/admin/make-admin/${userId}`);
  return data;
}

// If backend doesn't have "list users", we’ll add it.
// export async function listUsers() { ... }
