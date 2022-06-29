import { useEffect, RefObject } from "react";

export const useClickOutside = (
  ref: RefObject<HTMLDivElement>,
  callback: () => void,
  parentRef?: RefObject<HTMLDivElement>
) => {
  const listener = (event: any) => {
    if (parentRef) {
      if (parentRef.current && parentRef.current.contains(event.target)) {
        return;
      } else if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    } else {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  });
};
