import { useEffect } from "react";

export default function useKeyDown(key: string, handler: () => void) {
  useEffect(() => {
    const selectedKeyHandler = (event: KeyboardEvent) => {
      if (event.key === key) {
        handler();
      }
    };

    document.addEventListener("keydown", selectedKeyHandler);
    return () => {
      document.removeEventListener("keydown", selectedKeyHandler);
    };
  }, [handler, key]);
}
