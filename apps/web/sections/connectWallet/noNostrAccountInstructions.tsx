import { FiHelpCircle } from "react-icons/fi";

export const NoNostrAccountInstructions = () => {
  return (
    <div className="card w-full max-w-sm mx-auto shadow-2xl bg-base-100">
      <img
        src="/img/signum-xt-logo-transparent.png"
        alt="xt-wallet-logo"
        width={200}
      />
      <div className="py-6">
        <p className="text-justify">
          The XT Wallet was detected, but the currently selected account is not
          a Nostr Account.
        </p>
      </div>
      <div className="link text-left text-xs flex flex-row items-center mb-6">
        <FiHelpCircle className="opacity-60 mr-2" size={28} />
        <a
          href="https://www.youtube.com/watch?v=MRlj90ZA2Dc"
          target="_blank"
          rel="noreferrer noopener"
        >
          Learn how to create and/or import your Nostr in XT Wallet. It's very
          easy!
        </a>
      </div>
    </div>
  );
};
