"use client";
import React, { useRef, useState } from "react";
import { ChooseNameSection } from "./sections/chooseName";
import { ConnectWalletSection } from "./sections/connectWallet";
import { ClaimAliasSection } from "./sections/claimAlias";
import { WelcomeSection } from "./sections/welcome";

export function Home() {
  const chooseNameSectionRef = useRef<HTMLDivElement>();
  const connectWalletSectionRef = useRef<HTMLDivElement>();
  const claimAliasSectionRef = useRef<HTMLDivElement>();
  const [state, setState] = useState({
    name: "",
    nostrPubKey: "",
    nostrRelays: [],
    signumPubKey: "",
  });

  const handleNextStep = (nextRef) => {
    window.scrollTo({
      behavior: "smooth",
      top: nextRef.current.offsetTop,
    });
  };

  const handleGotoConnect = () => {
    handleNextStep(connectWalletSectionRef);
  };
  const handleGotoChooseName = () => {
    handleNextStep(chooseNameSectionRef);
  };

  const handleGotoClaimAlias = () => {
    handleNextStep(claimAliasSectionRef);
  };

  const handleOnReset = () => {
    // @ts-ignore
    window.scrollTo({ behavior: "instant", top: 0 });
    window.location.reload();
  };

  const handleConnection = (
    nostrPubKey: string,
    signumPubKey: string,
    nostrRelays: string[]
  ) => {
    setState({
      ...state,
      nostrPubKey,
      nostrRelays,
      signumPubKey,
    });
  };

  const handleName = (name: string) => {
    setState({
      ...state,
      name,
    });
  };

  const handleOnClaimed = () => {};

  return (
    <div>
      <div
        className="min-h-screen"
        style={{
          background: "url(./img/ostrich_wild.webp) no-repeat fixed",
          backgroundSize: "cover",
        }}
      >
        <div className="bg-gradient-to-bl from-indigo-500 via-purple-500 to-pink-500 opacity-90">
          <WelcomeSection onNext={handleGotoChooseName} />
          <ChooseNameSection
            ref={chooseNameSectionRef}
            onNext={handleGotoConnect}
            onName={handleName}
          />
          <ConnectWalletSection
            ref={connectWalletSectionRef}
            onNext={handleGotoClaimAlias}
            onConnection={handleConnection}
          />
          <ClaimAliasSection
            ref={claimAliasSectionRef}
            onGotoConnect={handleGotoConnect}
            onGotoName={handleGotoChooseName}
            onClaimed={handleOnClaimed}
            onReset={handleOnReset}
            {...state}
          />
        </div>
      </div>
    </div>
  );
}
