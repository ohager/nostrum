"use client";
import { useEffect, useRef, useState } from "react";
import pDebounce from "p-debounce";

function getDocumentSize() {
  if (typeof document !== "undefined") {
    return {
      height: document.body.clientHeight,
      width: document.body.clientWidth,
    };
  }

  return {
    height: 0,
    width: 0,
  };
}

export const useWindowSize = () => {
  const isMounted = useRef<boolean>();
  const [size, setSize] = useState(getDocumentSize());

  useEffect(() => {
    isMounted.current = true;
    const handleResize = pDebounce(() => {
      isMounted.current && setSize(getDocumentSize());
    }, 100);

    window.addEventListener("resize", handleResize);

    return () => {
      isMounted.current = false;
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return size;
};
