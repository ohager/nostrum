"use client";

import { ChooseNameSection } from "../sections/chooseName";
import { ConnectWalletSection } from "../sections/connectWallet";
import { useEffect, useRef, useState } from "react";
import { AppContextProvider } from "@/components/appContext";
import { ClaimAliasSection } from "../sections/claimAlias";
import { WelcomeSection } from "../sections/welcome";
import { useScroll, useTransform } from "framer-motion";

const Steps = ["choose-name", "connect-wallet"];

export default function Page() {
  const chooseNameSectionRef = useRef<HTMLDivElement>();
  const connectWalletNameSectionRef = useRef<HTMLDivElement>();
  const claimAliasSectionRef = useRef<HTMLDivElement>();

  const [state, setState] = useState({
    name: "ohager",
    nostrPubKey: "",
    signumPubKey: "",
  });

  const { scrollY } = useScroll();
  const dynamicOpacity = useTransform(scrollY, [0, 1000], [1, 0]);

  const handleNextStep = (nextRef) => {
    window.scrollTo({
      behavior: "smooth",
      top: nextRef.current.offsetTop,
    });
  };

  const handleConnection = (nostrPubKey: string, signumPubKey: string) => {
    setState({
      ...state,
      nostrPubKey,
      signumPubKey,
    });
  };

  const handleName = (name: string) => {
    setState({
      ...state,
      name,
    });
  };

  return (
    <div>
      <AppContextProvider>
        <div
          className="min-h-screen"
          style={{
            background: "url(./img/ostrich_wild.webp) no-repeat fixed",
            backgroundSize: "cover",
          }}
        >
          <div className="bg-gradient-to-bl from-indigo-500 via-purple-500 to-pink-500 opacity-90">
            <WelcomeSection
              onNext={() => handleNextStep(chooseNameSectionRef)}
            />
            <ChooseNameSection
              ref={chooseNameSectionRef}
              onNext={() => handleNextStep(connectWalletNameSectionRef)}
              onName={handleName}
            />
            <ConnectWalletSection
              ref={connectWalletNameSectionRef}
              onNext={() => handleNextStep(claimAliasSectionRef)}
              onConnection={handleConnection}
            />
            <ClaimAliasSection ref={claimAliasSectionRef} {...state} />
          </div>
        </div>
      </AppContextProvider>
    </div>
  );
}
