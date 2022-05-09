import * as React from "react";
import { useEffect } from "react";

function useOutsideClick<T extends HTMLElement>(
  ref: React.RefObject<T>,
  outsideClickHandler: () => void
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        outsideClickHandler();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref, outsideClickHandler]);
}

export default useOutsideClick;
