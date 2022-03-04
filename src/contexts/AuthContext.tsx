import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getCookie } from "../utils/cookies";
import api from "../api";

interface AuthContextState {
  isLoggedIn: boolean;
  loading: boolean;
  token: string;
  setToken(token: string): void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext: React.Context<AuthContextState> =
  createContext<AuthContextState>({} as AuthContextState);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string>("");
  const refreshToken = getCookie("refreshToken");

  useEffect(() => {
    if (!token && !refreshToken) {
      setLoading(false);
      return;
    }
    if (!token && refreshToken) {
      setLoading(true);
      api.Auth.refreshAccessToken(refreshToken)
        .then((res) => {
          if (res.success) {
            setToken(res.accessToken);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [refreshToken, token]);

  const memoizedValue = useMemo(
    () => ({
      isLoggedIn: Boolean(token),
      loading,
      token,
      setToken,
    }),
    [loading, token]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext<AuthContextState>(AuthContext);
