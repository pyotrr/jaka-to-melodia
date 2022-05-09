import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const NoAuthGuard: React.FC = () => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) return <Navigate to={"/jaka-to-melodia/play"} replace />;
  return <Outlet />;
};

export default NoAuthGuard;
