"use client";

import { ChooseNameSection } from "../sections/chooseName";
import { ConnectWalletSection } from "../sections/connectWallet";
import React, { useRef, useState } from "react";
import { ClaimAliasSection } from "../sections/claimAlias";
import { WelcomeSection } from "../sections/welcome";
import { MetaTags } from "@/components/metatags";

export default function Page() {
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
      <MetaTags
        title="Nostrum"
        description="Get your global and decentralized Nostr Identifier (NIP05) for free! The Signum blockchain provides you a decentralized Id (Alias), which you own without the need of a centralized domain. Be discoverable worldwide, independent of Nostr relays. Your keys, Your Id!"
        keywords="nostr, nip05, signum, web3, blockchain, decentralized technology, decentralized identity"
        imgUrl="https://nostrum.network/img/nostrum-seo.jpg"
        viewport="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />
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
