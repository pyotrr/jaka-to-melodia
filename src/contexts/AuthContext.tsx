import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { deleteCookie, getCookie } from "../utils/cookies";
import api from "../api";
import { useDatabase, User } from "./DatabaseContext";

interface AuthContextState {
  isLoggedIn: boolean;
  loading: boolean;
  token: string;
  setToken(token: string): void;
  logout(): void;
  userProfile: User | null;
  setUserProfile(user: User): void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext: React.Context<AuthContextState> =
  createContext<AuthContextState>({} as AuthContextState);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string>("");
  const refreshToken = getCookie("refreshToken");
  const { database } = useDatabase();

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

  useEffect(() => {
    if (userProfile || !token) return;
    database.getAll("users").then((users) => {
      if (users.length) {
        setUserProfile(users[0]);
      }
    });
  }, [database, token, userProfile]);

  const logout = useCallback(async () => {
    deleteCookie("refreshToken");
    setUserProfile(null);
    setToken("");
    await database.clear("users");
  }, [database]);

  const memoizedValue = useMemo(
    () => ({
      isLoggedIn: Boolean(token),
      loading,
      token,
      setToken,
      logout,
      userProfile,
      setUserProfile,
    }),
    [loading, logout, token, userProfile]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext<AuthContextState>(AuthContext);
