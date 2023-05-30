"use client";
import { FiGithub } from "react-icons/fi";
import Image from "next/image";
import { useContext } from "react";
import { AppContext } from "@/components/appContext";
import { Fade } from "react-reveal";

export const NavBar = () => {
  const { SignaSats } = useContext(AppContext);

  return (
    <div className="fixed navbar z-10 flex items-center">
      <div className="flex-1">
        {/*{SignaSats && (*/}
        {/*  <Fade>*/}
        {/*    <small className="text-xs text-pink-300">*/}
        {/*      1 SIGNA = {SignaSats} SATS*/}
        {/*    </small>*/}
        {/*  </Fade>*/}
        {/*)}*/}
      </div>
      <div className="flex-none">
        <div className="tooltip tooltip-left" data-tip="Github">
          <a
            href="https://github.com/ohager/denavas"
            className="btn btn-square btn-ghost btn-xl"
            rel="noreferrer noopener"
            target="_blank"
          >
            <FiGithub size={20} />
          </a>
        </div>
        <div className="tooltip tooltip-left" data-tip="Signum Network">
          <a
            href="https://signum.network"
            className="btn btn-square btn-ghost btn-xl"
            rel="noreferrer noopener"
            target="_blank"
          >
            <Image
              src="/img/signum-logo.svg"
              width={20}
              height={20}
              alt={"Signum Network Logo"}
            />
          </a>
        </div>
      </div>
    </div>
  );
};
