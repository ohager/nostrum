import Image from "next/image";

export const NotGrantedInstructions = () => {
  return (
    <div className="card w-full max-w-sm mx-auto shadow-2xl bg-base-100">
      <div className="card-body">
        <Image
          src="/img/signum-xt-logo-transparent.png"
          alt="xt-wallet-logo"
          width={200}
        />
        <div className="py-6">
          <p className="text-justify">
            The XT Wallet was detected, but this application has no permission
            granted.
          </p>
        </div>
      </div>
    </div>
  );
};
