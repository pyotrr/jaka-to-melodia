import React, { useEffect } from "react";
import useURLSearchParams from "../../../utils/hooks/useURLSearchParameters";
import Loading from "../../layout/Loading";
import api from "../../../api";
import { useAuth } from "../../../contexts/AuthContext";
import { setCookie } from "../../../utils/cookies";
import { useDatabase } from "../../../contexts/DatabaseContext";

const LoginRedirect: React.FC = () => {
  const { code } = useURLSearchParams();
  const { setToken, setUserProfile } = useAuth();
  const { database } = useDatabase();

  useEffect(() => {
    if (!code) return;
    api.Auth.getAccessToken(code).then(async (res) => {
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
        const { success, user } = await api.Users.getUserProfile({
          token: res.accessToken,
        });
        if (!success) {
          throw new Error("Could not get user profile");
        }
        const userProfile = {
          id: user.id,
          name: user.name,
          profilePicUrl: user.images[0].url,
        };
        setUserProfile(userProfile);
        await database.put("users", userProfile);
      }
      return null;
    });
  }, [code, database, setToken, setUserProfile]);

  return <Loading />;
};

export default LoginRedirect;
