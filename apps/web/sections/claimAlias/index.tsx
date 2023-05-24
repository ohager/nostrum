import { Hero } from "@/components/hero";
import { forwardRef, useMemo, useState } from "react";
import { BaseSection } from "../baseSection";
import { FiAlertCircle } from "react-icons/fi";
import { Zoom } from "react-reveal";
import { Address } from "@signumjs/core";
import { useAppContext } from "@/hooks/useAppContext";
import { nip19 } from "nostr-tools";
import { Typewriter } from "react-simple-typewriter";

const shortenString = (
  str: string,
  trimOffset: number = 12,
  delimiter = "…"
): string => {
  const offset = trimOffset / 2;
  return str.length > trimOffset
    ? str.substring(0, offset) + delimiter + str.substring(str.length - offset)
    : str;
};

// ① ② ③ ④ ⑤ ⑥ ⑦
interface Props {
  signumPubKey: string;
  nostrPubKey: string;
  name: string;
}

// eslint-disable-next-line react/display-name
export const ClaimAliasSection = forwardRef<HTMLDivElement, Props>(
  ({ signumPubKey, name, nostrPubKey }, ref) => {
    const ClaimingPhases = [
      "creating alias...",
      "queueing alias transfer...",
      "Successfully Done 🦩",
    ];
    const { Ledger } = useAppContext();
    const [claimingPhase, setClaimingPhase] = useState(0);

    const handleClaimNow = () => {
      setClaimingPhase(Math.min(claimingPhase + 1, ClaimingPhases.length));
      // TODO:
    };

    const address = useMemo(() => {
      if (!signumPubKey) return "";
      return Address.fromPublicKey(signumPubKey).getReedSolomonAddress(false);
    }, [Ledger.IsTestnet, signumPubKey]);

    const npub = useMemo(() => {
      if (!nostrPubKey) return "";
      const npubLong = nip19.npubEncode(nostrPubKey);
      return shortenString(npubLong, 16, ":");
    }, [nostrPubKey]);

    const waitForName = !name;
    const waitForConnection = name && !(signumPubKey && nostrPubKey);
    const waitForClaim = name && signumPubKey && nostrPubKey;
    const isDone = claimingPhase >= ClaimingPhases.length;

    console.log(ClaimingPhases[claimingPhase - 1]);
    return (
      // @ts-ignore
      <BaseSection ref={ref} sign="③">
        <Zoom>
          <Hero>
            <div className="flex flex-col items-center">
              <div className="flex lg:flex-row flex-col items-center">
                <div className="flex-1 flex flex-col justify-between p-6">
                  <div>
                    <h1 className="text-5xl font-bold">I want it!</h1>
                    <p className="py-6 text-justify">
                      When you claim your name, you will get a so called{" "}
                      <em>Alias</em>. This <em>Alias</em> is a data container on
                      the Signum Network and belongs exclusively to you. The
                      data inside the <em>Alias</em> can be changed, e.g. with
                      the
                      <a
                        className="link"
                        href="https://signumswap.com"
                        rel="noreferrer noopener"
                        target="_blank"
                      >
                        &nbsp;SignumSwap - DeFi Portal
                      </a>{" "}
                      or the
                      <a
                        className="link"
                        href="https://phoenix-wallet.rocks"
                        rel="noreferrer noopener"
                        target="_blank"
                      >
                        &nbsp;Signum Phoenix Wallet
                      </a>
                      .
                    </p>
                    <div className="text-left text-xs flex flex-row items-center mb-6">
                      <FiAlertCircle className="opacity-60 mr-2" size={28} />
                      Mind that it's necessary to have a small balance on your
                      Signum Account. Maintaining an Alias costs you 12.5 SIGNA
                      every three months and will be charged automatically. The
                      first three months are free!
                    </div>
                  </div>
                </div>
                <div className="flex-1 max-w-lg mx-auto items-center pb-6">
                  <div className="mockup-code min-h-[200px] max-w-[200px] md:max-w-none md:text-base text-sm break-all">
                    {waitForName && (
                      <pre data-prefix="$">
                        <code>
                          claim alias <BlinkingCursor />
                        </code>
                      </pre>
                    )}

                    {waitForConnection && (
                      <>
                        <pre data-prefix="$">
                          <code>claim alias {name}</code>
                        </pre>
                        <pre data-prefix=">" className="text-warning">
                          <code>
                            waiting for connection...
                            <BlinkingCursor />
                          </code>
                        </pre>
                      </>
                    )}

                    {waitForClaim && (
                      <>
                        <pre data-prefix="$">
                          <code>claim alias {name}</code>
                        </pre>
                        <pre data-prefix=">" className="text-success">
                          <code>connected successfully</code>
                        </pre>
                        <pre data-prefix=">" className="">
                          <code>nostr: {npub}</code>
                        </pre>
                        <pre data-prefix=">" className="">
                          <code>signum: {address}</code>
                        </pre>
                        {claimingPhase === 0 && (
                          <pre data-prefix="$" className="text-warning">
                            <code>
                              claim now?
                              <BlinkingCursor />
                            </code>
                          </pre>
                        )}
                        {claimingPhase > 0 && (
                          <>
                            <pre data-prefix="$" className="text-warning">
                              <code>claim now? y</code>
                            </pre>
                            <pre
                              data-prefix=">"
                              className={`${
                                isDone ? "text-success" : "text-grey-400"
                              }`}
                            >
                              <code>
                                {ClaimingPhases[claimingPhase - 1]}
                                {!isDone && <BlinkingCursor />}
                              </code>
                            </pre>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button
                  className="btn btn-lg btn-accent"
                  onClick={handleClaimNow}
                >
                  Claim Now!
                </button>
              </div>
            </div>
          </Hero>
        </Zoom>
      </BaseSection>
    );
  }
);

const BlinkingCursor = () => <span className="animate-blink">|</span>;
