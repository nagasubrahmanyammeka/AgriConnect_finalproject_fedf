import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "50px" }}>Checking authentication...</div>;
  }

  if (!user) {
    // User not logged in
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // User doesn't have permission
    return <Navigate to="/" replace />;
    // OR show custom message:
    // return <div style={{ textAlign: "center", marginTop: "50px" }}>Access denied.</div>;
  }

  // All good — allow access
  return children;
};

export default ProtectedRoute;
