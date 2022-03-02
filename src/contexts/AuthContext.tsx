import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

interface AuthContextState {
  token: string;
  setToken(token: string): void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext: React.Context<AuthContextState> =
  createContext<AuthContextState>({} as AuthContextState);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string>("");

  const memoizedValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext<AuthContextState>(AuthContext);
