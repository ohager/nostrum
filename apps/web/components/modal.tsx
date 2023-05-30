"use client";

import React, { useEffect, useState } from "react";
import { useDetectClickOutside } from "@/hooks/useDetectClickOutside";
import { ModalEvent } from "@/types/modalEvent";
import { motion } from "framer-motion";
import Image from "next/image";

export const Modal = () => {
  const [content, setContent] = useState<ModalEvent | null>(null);
  const { ref } = useDetectClickOutside((clickedOutside) => {
    if (clickedOutside) {
      setContent(null);
    }
  });

  useEffect(() => {
    function handleModalEvent(e: CustomEvent<ModalEvent>) {
      setContent(e.detail);
    }

    window.addEventListener("modal", handleModalEvent);

    return () => {
      window.removeEventListener("modal", handleModalEvent);
    };
  }, []);

  return (
    <div
      className="modal modal-middle"
      style={{
        visibility: content ? "visible" : "hidden",
        opacity: content ? 1 : 0,
      }}
    >
      <div className="relative">
        {content && (
          <motion.div
            className="absolute rotate-12"
            animate={{ top: -100, right: 40 }}
            style={{ right: "120px" }}
          >
            <img src="/img/ostrich_head.webp" width={100} alt="Howdy Ostrich" />
          </motion.div>
        )}
        <div ref={ref} className="modal-box overflow-visible z-10">
          <h3 className="font-bold text-lg">{content?.title}</h3>
          <p className="py-4">{content?.text}</p>
        </div>
      </div>
    </div>
  );
};
