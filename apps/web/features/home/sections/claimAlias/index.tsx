import { Hero } from "@/components/hero";
import { forwardRef, useMemo, useState } from "react";
import { BaseSection } from "../baseSection";
import { Zoom } from "react-reveal";
import { Address } from "@signumjs/core";
import { useAppContext } from "@/hooks/useAppContext";
import { nip19 } from "nostr-tools";
import ReactConfetti from "react-confetti";
import { useModal } from "@/hooks/useModal";
import { useWindowSize } from "@/hooks/useWindowSize";
import { createAlias } from "./createAlias";
import { Simulate } from "react-dom/test-utils";

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

interface Props {
  signumPubKey: string;
  nostrPubKey: string;
  nostrRelays: string[];
  name: string;
  onGotoName: () => void;
  onGotoConnect: () => void;
  onClaimed: () => void;
  onReset: () => void;
}

function sleep(millies) {
  return new Promise((resolve) => setTimeout(resolve, millies));
}

// eslint-disable-next-line react/display-name
export const ClaimAliasSection = forwardRef<HTMLDivElement, Props>(
  (
    {
      signumPubKey,
      name,
      nostrPubKey,
      nostrRelays,
      onGotoName,
      onGotoConnect,
      onClaimed,
      onReset,
    },
    ref
  ) => {
    const ClaimingPhases = [
      "creating alias...",
      "queueing alias transfer...",
      "Successfully Done 🦩",
    ];
    const { Ledger, Wallet } = useAppContext();
    const [claimingPhase, setClaimingPhase] = useState(-1);
    const [runConfetti, setRunConfetti] = useState(false);
    const [claimError, setClaimError] = useState("");
    const { openModal } = useModal();
    const windowSize = useWindowSize();

    const handleClaimNow = async () => {
      try {
        setClaimingPhase(0);
        await createAlias({
          name,
          nodeHost:
            Wallet.Extension.connection.currentNodeHost || Ledger.DefaultNode,
          nostrPublicKey: nostrPubKey,
          nostrRelays: nostrRelays,
          signumPublicKey: signumPubKey,
        });
        await sleep(1_000); // artificial delay
        setClaimingPhase(1);
        await sleep(1_500);
        setClaimingPhase(2);
        setRunConfetti(true);
        setTimeout(() => {
          setRunConfetti(false);
        }, 5_000);
        openModal({
          type: "success",
          title: "Congratulations 🎉",
          text: (
            <div>
              <p className="border rounded text-lg px-4 py-2">
                You just claimed: <code>{name}</code>
              </p>
              <p className="pt-2">
                Your verifiable NIP05 Nostr Identifiers are:
                <ul>
                  <li>
                    <b>{name}@signum.network</b>
                  </li>
                  <li>
                    <b>{name}@nostrum.network</b>
                  </li>
                </ul>
              </p>
              <p className="pt-2">
                Your name is being processed by the network and will be fully
                available in two blocks. Check your wallet for the incoming
                transactions.
              </p>
            </div>
          ),
        });
      } catch (e: any) {
        setClaimError(`Claiming Failed - ${e.message}`);
        openModal({
          type: "error",
          title: "Oh no!",
          text: "Something went wrong! Please try again and eventually inform the developer(s)",
        });
      }
    };

    const { address, accountId } = useMemo(() => {
      if (!signumPubKey)
        return {
          address: "",
          accountId: "",
        };
      const a = Address.fromPublicKey(signumPubKey);
      return {
        address: a.getReedSolomonAddress(false),
        accountId: a.getNumericId(),
      };
    }, [signumPubKey]);

    const npub = useMemo(() => {
      if (!nostrPubKey) return "";
      const npubLong = nip19.npubEncode(nostrPubKey);
      return shortenString(npubLong, 16, ":");
    }, [nostrPubKey]);

    const waitForName = !name;
    const waitForConnection = name && !(signumPubKey && nostrPubKey);
    const waitForClaim = name && signumPubKey && nostrPubKey;
    const isClaiming = claimingPhase !== -1;
    const isDone = claimingPhase >= ClaimingPhases.length - 1;
    const hasError = claimError.length > 0;

    return (
      // @ts-ignore
      <BaseSection ref={ref} sign="③">
        <ReactConfetti recycle={runConfetti} width={windowSize.width} />
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
                        {claimingPhase === -1 && (
                          <pre data-prefix="$" className="text-warning">
                            <code>
                              claim now?
                              <BlinkingCursor />
                            </code>
                          </pre>
                        )}
                        {claimingPhase >= 0 && (
                          <>
                            <pre data-prefix="$" className="text-warning">
                              <code>claim now? y</code>
                            </pre>
                            {!hasError ? (
                              <pre
                                data-prefix=">"
                                className={`${
                                  isDone ? "text-success" : "text-gray-400"
                                }`}
                              >
                                <code>
                                  {ClaimingPhases[claimingPhase]}
                                  {!isDone ? (
                                    <BlinkingCursor />
                                  ) : (
                                    <>
                                      &nbsp;-&nbsp;
                                      <a
                                        className="link"
                                        href={`${Ledger.ExploreBaseUrl}/txsPending`}
                                        rel="noreferrer noopener"
                                        target="_blank"
                                      >
                                        See Explorer
                                      </a>
                                    </>
                                  )}
                                </code>
                              </pre>
                            ) : (
                              <pre data-prefix=">" className="text-red-500">
                                <code>
                                  {claimError}
                                  <BlinkingCursor />
                                </code>
                              </pre>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-center">
                {waitForName && (
                  <button className="btn btn-lg btn-ghost" onClick={onGotoName}>
                    Choose Name First!
                  </button>
                )}
                {waitForConnection && (
                  <button
                    className="btn btn-lg btn-ghost"
                    onClick={onGotoConnect}
                  >
                    Connect to Wallet First!
                  </button>
                )}

                {waitForClaim && !isDone && !hasError && (
                  <button
                    className="btn btn-lg btn-accent"
                    onClick={handleClaimNow}
                    disabled={isClaiming}
                  >
                    {isClaiming && (
                      <span className="loading loading-spinner"></span>
                    )}
                    Claim Now!
                  </button>
                )}
                {isDone && !hasError && (
                  <button className="btn btn-lg btn-ghost" onClick={onReset}>
                    Reset
                  </button>
                )}

                {hasError && (
                  <button className="btn btn-lg btn-ghost" onClick={onReset}>
                    Retry
                  </button>
                )}
              </div>
            </div>
          </Hero>
        </Zoom>
      </BaseSection>
    );
  }
);

const BlinkingCursor = () => <span className="animate-blink">|</span>;
