import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function RequireRole({ allowed = [] }) {
  const { roles } = useAuth();
  const ok = roles?.some((r) => allowed.includes(r));
  return ok ? <Outlet /> : <Navigate to="/" replace />;
}
