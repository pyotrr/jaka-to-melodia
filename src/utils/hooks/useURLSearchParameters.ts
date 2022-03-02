import { useLocation } from "react-router-dom";

export default function useURLSearchParams(): { [key: string]: string } {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  return Object.fromEntries(params.entries());
}
