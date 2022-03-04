import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";
import { deleteCookie } from "../cookies";

export default function useLogOut() {
  const { setToken } = useAuth();

  useEffect(() => {
    deleteCookie("refreshToken");
    setToken("");
  }, [setToken]);
}
