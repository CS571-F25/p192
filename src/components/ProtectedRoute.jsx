// src/components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/" />;
  if (role && user.role !== role) return <Navigate to="/menu" />;

  return children;
}
