// src/routes/PrivateRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type PrivateRouteProps = {
  children: React.ReactElement;
  role?: "professor" | "aluno";
};

export default function PrivateRoute({ children, role }: PrivateRouteProps) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.cargo !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
