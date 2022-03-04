import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../components/layout/Loading";

const AuthGuard: React.FC = () => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return <Loading />;
  if (!isLoggedIn) return <Navigate to={"/"} replace />;

  return <Outlet />;
};

export default AuthGuard;
