import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";

export default function useLogOut() {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);
}
