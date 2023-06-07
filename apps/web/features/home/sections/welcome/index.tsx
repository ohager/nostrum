import { forwardRef } from "react";
import { BaseSection } from "../baseSection";
import { NextProps } from "@/types/nextProps";
import { Hero } from "@/components/hero";
import { Typewriter, useTypewriter } from "react-simple-typewriter";

// eslint-disable-next-line react/display-name
export const WelcomeSection = forwardRef<HTMLDivElement, NextProps>(
  ({ onNext }, ref) => {
    const [text] = useTypewriter({
      words: [
        "Decentralized Nostr Identifiers",
        "Domainless Verification",
        "Globally Searchable",
      ],
      loop: 0,
    });
    return (
      // @ts-ignore
      <BaseSection ref={ref} sign="">
        <h2
          className="relative top-[2rem] lg:top-[6rem] mx-auto max-w-4xl text-6xl text-center font-extrabold text-transparent bg-clip-text
                      bg-gradient-to-r from-green-200 to-pink-300 drop-shadow-xl hidden md:block"
        >
          {text || <span>&nbsp;</span>}
        </h2>
        <Hero>
          <div className="top-[3rem] flex lg:flex-row flex-col">
            <div className="flex-1 flex flex-col justify-between s p-6">
              <div>
                <h1 className="text-5xl font-bold">Welcome, Nostrian!</h1>
                <p className="py-6 text-justify text-2xl">
                  Get your <u>globally decentralized</u> NIP05 Nostr Identifier.
                  Claim your very own Nostr Name stored on the Signum
                  Blockchain. Truly decentralized! All you need is a Nostr
                  public key and a Signum Account.
                </p>
                <p className="border border-base-100/40 p-4 rounded-xl">
                  <b>Why?</b>
                  <ul className="list-disc list-inside">
                    <li>You don't need an own internet domain</li>
                    <li>You are discoverable worldwide - no relays needed</li>
                    <li>Your keys, Your Id</li>
                    <li>No costs</li>
                  </ul>
                </p>
              </div>
            </div>
            <div className="max-w-md mx-auto">
              <div className="card bg-base-100 shadow-xl">
                <figure>
                  <img
                    src="/img/signum-banner.jpg"
                    width={480}
                    alt="Signum Banner"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">Claim your Name</h2>
                  <p>Within three simple steps you can get your name</p>
                  <ul className="list-none text-justify mt-2">
                    <li>① Choose your Name</li>
                    <li>② Connect with XT Wallet</li>
                    <li>③ Claim your Name</li>
                  </ul>
                  <div className="text-center pt-4">
                    <button className="btn btn-lg btn-info" onClick={onNext}>
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Hero>
      </BaseSection>
    );
  }
);
