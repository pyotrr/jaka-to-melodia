import React, { useEffect } from "react";
import useURLSearchParams from "../../../utils/hooks/useURLSearchParameters";
import Loading from "../../layout/Loading";
import { Navigate } from "react-router-dom";
import api from "../../../api";
import { useAuth } from "../../../contexts/AuthContext";

const LoginRedirect: React.FC = () => {
  const { code } = useURLSearchParams();
  const { token, setToken } = useAuth();

  useEffect(() => {
    if (!code) return;
    api.Auth.getAccessToken(code).then((res) => {
      console.log(res);
      if (res.success) {
        setToken(res.accessToken);
      }
    });
  }, [code, setToken]);

  if (!token) return <Loading />;
  return <Navigate to={"/"} replace />;
};

export default LoginRedirect;
