import { axiosClient } from "./axiosClient";

export async function loginApi({ email, password }) {
  const { data } = await axiosClient.post("/user/login", { email, password });

  // Adjust this mapping to match your exact response shape:
  // Example assumptions:
  // data.token or data.jwtToken, and data.roles, data.email, data.userId
  const token = data?.token || data?.jwtToken || data?.accessToken;
  const user = {
    userId: data?.userId || data?.id,
    email: data?.email || email,
    roles: data?.roles || data?.role || [],
    name: data?.name || ""
  };

  if (!token) throw new Error("Token not found in login response");
  return { token, user };
}

export async function registerApi({ name, email, password }) {
  const { data } = await axiosClient.post("/user/singin", { name, email, password });
  return data;
}
