import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../authStore";

const ProtectedRoute = ({ children, requiredRole }) => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user?.user_type?.toLowerCase() !== requiredRole.toLowerCase()) {
    return <Navigate to={user?.user_type?.toLowerCase() === "user" ? "/membership" : "/login"} />;
  }  

  return children;
};

export default ProtectedRoute;
