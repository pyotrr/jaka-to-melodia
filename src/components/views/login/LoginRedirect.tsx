import React, { useEffect } from "react";
import useURLSearchParams from "../../../utils/hooks/useURLSearchParameters";
import Loading from "../../layout/Loading";
import api from "../../../api";
import { useAuth } from "../../../contexts/AuthContext";
import { setCookie } from "../../../utils/cookies";
import { User } from "../../../idb";
import Users from "../../../idb/respositories/users";

const LoginRedirect: React.FC = () => {
  const { code } = useURLSearchParams();
  const { setToken, setUserProfile } = useAuth();

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
        const userProfile: User = {
          id: user.id,
          name: user.name,
          profilePicUrl: user.images[0].url,
          country: user.country,
        };
        setUserProfile(userProfile);
        await Users.addUser(userProfile);
      }
      return null;
    });
  }, [code, setToken, setUserProfile]);

  return <Loading />;
};

export default LoginRedirect;
