import { useEffect, useRef } from "react";

type ClickHandler = (clickedOutside: boolean) => void;
export function useDetectClickOutside(handler: ClickHandler) {
  const ref = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event) => {
    handler(ref.current && !ref.current.contains(event.target));
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [handleClickOutside]);

  return { ref };
}
