// src/components/AdminOnly.jsx
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function AdminOnly({ children }) {
  const { user } = useContext(AuthContext);
  if (user?.role === "manager") return children;
  return null;
}
