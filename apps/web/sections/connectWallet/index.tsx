import { forwardRef, useMemo, useState } from "react";
import { Zoom, Fade } from "react-reveal";
import { BaseSection } from "../baseSection";
import { useAppContext } from "@/hooks/useAppContext";
import { useModal } from "@/hooks/useModal";
import { WrongNetworkInstructions } from "./wrongNetworkInstructions";
import { NotGrantedInstructions } from "./notGrantedInstructions";
import { GetWalletInstructions } from "./getWalletInstructions";
import { NoNostrAccountInstructions } from "./noNostrAccountInstructions";
import { NextProps } from "@/types/nextProps";
import { Hero } from "@/components/hero";
import { FiLink2 } from "react-icons/fi";

interface Props {
  onConnection: (npub: string, pk: string) => void;
}

// eslint-disable-next-line react/display-name
export const ConnectWalletSection = forwardRef<
  HTMLDivElement,
  Props & NextProps
>(({ onNext, onConnection }, ref) => {
  const { Ledger, Wallet, AppName, Nostr } = useAppContext();
  const [errorName, setErrorName] = useState("");
  const [connected, setConnected] = useState(false);
  const { openModal } = useModal();

  const Instructions = useMemo(() => {
    switch (errorName) {
      case "InvalidNetworkError":
        return WrongNetworkInstructions;
      case "NotGrantedWalletError":
        return NotGrantedInstructions;
      case "NoNostrAccountError":
        return NoNostrAccountInstructions;
      case "NotFoundWalletError":
        openModal({
          type: "error",
          title: "No Wallet Found",
          text: "It seems that XT Wallet is not installed on this browser",
        });
        return GetWalletInstructions;
      default:
        return GetWalletInstructions;
    }
  }, [errorName, openModal]);

  const handleConnect = async () => {
    try {
      const connection = await Wallet.Extension.connect({
        appName: AppName,
        networkName: Ledger.NetworkName,
      });
      const npub = await window.nostr.getPublicKey();
      if (!npub) {
        const e = new Error(
          "The current selected Account is not a Nostr Account"
        );
        e.name = "NoNostrAccountError";
        throw e;
      }

      Nostr.PublicKey = npub;
      onConnection(npub, connection.publicKey);
      setConnected(true);
      onNext();
    } catch (e) {
      setConnected(false);
      setErrorName(e.name);
    }
  };
  return (
    // @ts-ignore
    <BaseSection ref={ref} sign="②">
      <Zoom>
        <Hero>
          <div className="flex lg:flex-row flex-col items-center">
            <section>
              <h1 className="text-5xl font-bold">Your Public Keys</h1>
              <p className="py-6 text-justify">
                Now you need your <u>public</u> keys. Both your Nostr key and
                your Signum key. The easiest way is to use the Signum XT Wallet.
              </p>
              <div className="w-full text-center">
                {!connected ? (
                  <button
                    className="btn btn-accent btn-lg"
                    onClick={handleConnect}
                  >
                    <FiLink2 className="mr-2" />
                    Connect
                  </button>
                ) : (
                  <div className="btn btn-lg bg-gradient-to-bl from-yellow-200 to-green-400 border-none text-gray-700">
                    Connected!
                  </div>
                )}
              </div>
            </section>
            <section className="flex-shrink-0 m-6">
              {Instructions && (
                <Fade right>
                  <Instructions />
                </Fade>
              )}
            </section>
          </div>
        </Hero>
      </Zoom>
    </BaseSection>
  );
});
