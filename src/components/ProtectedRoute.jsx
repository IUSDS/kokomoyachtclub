import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../authStore";

const ProtectedRoute = ({ children, requiredRole }) => {
  const user_type = useAuthStore((state) => state.user_type);

  // console.log("User in ProtectedRoute:", user_type);

  if (!user_type) {
    console.warn("No user detected. Redirecting to login.");
    return <Navigate to="/login" />;
  }

  // if (!user?.user_type) {
  //   console.error("User type is missing. Redirecting to login.");
  //   return <Navigate to="/login" />;
  // }

  if (requiredRole && user_type?.toLowerCase() !== requiredRole.toLowerCase()) {
    console.warn(`User role mismatch. Expected: ${requiredRole}, Found: ${user_type}`);
    return <Navigate to={user_type?.toLowerCase() === "user" ? "/membership" : "/login"} />;
  }

  return children;
};

export default ProtectedRoute;
