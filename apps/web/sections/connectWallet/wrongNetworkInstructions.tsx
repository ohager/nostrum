import { useAppContext } from "@/hooks/useAppContext";
export const WrongNetworkInstructions = () => {
  const { Ledger } = useAppContext();

  return (
    <div className="card w-full max-w-sm mx-auto shadow-2xl bg-base-100">
      <div className="card-body">
        <img
          src="/img/signum-xt-logo-transparent.png"
          alt="xt-wallet-logo"
          width={200}
        />
        <div className="py-6">
          <p className="text-justify">
            The XT Wallet was detected, but your are connected to the wrong
            network.
          </p>
          <div className="text-justify mt-2">
            The required network must be
            <div className="alert !justify-center mt-2 shadow-lg">
              <div>{Ledger.NetworkName}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
