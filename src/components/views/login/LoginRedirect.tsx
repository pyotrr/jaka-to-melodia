import React, { useEffect } from "react";
import useURLSearchParams from "../../../utils/hooks/useURLSearchParameters";
import Loading from "../../layout/Loading";
import api from "../../../api";
import { useAuth } from "../../../contexts/AuthContext";
import { setCookie } from "../../../utils/cookies";

const LoginRedirect: React.FC = () => {
  const { code } = useURLSearchParams();
  const { setToken } = useAuth();

  useEffect(() => {
    if (!code) return;
    api.Auth.getAccessToken(code).then((res) => {
      console.log(res);
      if (res.success) {
        const refreshTokenExpirationDate = new Date();
        refreshTokenExpirationDate.setDate(
          refreshTokenExpirationDate.getDate() + 7
        );
        setToken(res.accessToken);
        setCookie(
          "refreshToken",
          `${
            res.refreshToken
          }; expires=${refreshTokenExpirationDate.toUTCString()}; samesite=strict`
        );
      }
      return null;
    });
  }, [code, setToken]);

  return <Loading />;
};

export default LoginRedirect;
