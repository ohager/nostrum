"use client";

/* eslint-disable turbo/no-undeclared-env-vars */
import { createContext, FC } from "react";
import { GenericExtensionWallet } from "@signumjs/wallets";
import { AppContextType } from "@/types/appContextType";
import { ChildrenProps } from "@/types/childrenProps";
import * as process from "process";

const toBoolean = (v) => v === "true" || v === "1";

const IsTestnet = toBoolean(process.env.NEXT_PUBLIC_IS_TESTNET || "true");

const context: AppContextType = {
  AppName: "Nostrum",
  Wallet: {
    Extension: new GenericExtensionWallet(),
  },
  Nostr: {
    PublicKey: "",
    Relays: [],
  },
  Ledger: {
    IsTestnet,
    DefaultNode: process.env.NEXT_PUBLIC_DEFAULT_NODE || "",
    AliasTld: process.env.NEXT_PUBLIC_SIGNUM_TLD || "nostr",
    NetworkName: IsTestnet ? "Signum-TESTNET" : "Signum",
    ExploreBaseUrl: IsTestnet
      ? "https://t-chain.signum.network"
      : "https://chain.signum.network",
  },
};

export const AppContext = createContext<AppContextType>(context);

export const AppContextProvider: FC<ChildrenProps> = ({ children }) => {
  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
