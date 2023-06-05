"use client";
import Image from "next/image";
import { useContext } from "react";
import { AppContext } from "@/components/appContext";
import { BsGithub, BsDiscord, BsTelegram } from "react-icons/bs";

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
            <BsGithub size={20} />
          </a>
        </div>
        <div className="tooltip tooltip-left" data-tip="Signum Discord">
          <a
            href="https://discord.gg/b8Xm4KtHdU"
            className="btn btn-square btn-ghost btn-xl"
            rel="noreferrer noopener"
            target="_blank"
          >
            <BsDiscord size={20} />
          </a>
        </div>
        <div className="tooltip tooltip-left" data-tip="Signum Telegram">
          <a
            href="https://t.me/signumnetwork"
            className="btn btn-square btn-ghost btn-xl"
            rel="noreferrer noopener"
            target="_blank"
          >
            <BsTelegram size={20} />
          </a>
        </div>
        <div
          className="tooltip tooltip-left"
          data-tip="Signum Network Home Page"
        >
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
