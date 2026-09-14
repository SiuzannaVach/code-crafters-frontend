import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getSession } from "../../utils/authStorage";

const ProtectedRoute: React.FC = () => {
  const session = getSession();

  return session ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
