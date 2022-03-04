import { useCallback, useEffect, useRef } from "react";

type IsMountedPredicate = () => boolean;

export default function useIsMounted(): IsMountedPredicate {
  const isMounted = useRef<boolean>(true);

  useEffect(
    () => () => {
      isMounted.current = false;
    },
    []
  );

  return useCallback(() => isMounted.current, []);
}
