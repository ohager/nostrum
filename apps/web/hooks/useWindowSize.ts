"use client";
import { useEffect, useRef, useState } from "react";
import pDebounce from "p-debounce";

function getDocumentSize() {
  if (!document) {
  }
  return {
    height: document ? document.body.clientHeight : 0, // SSR
    width: document ? document.body.clientWidth : 0,
  };
}

export const useWindowSize = () => {
  const isMounted = useRef<boolean>();
  const [size, setSize] = useState({
    height: 0,
    width: 0,
  });

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
