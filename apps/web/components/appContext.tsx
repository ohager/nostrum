"use client";

/* eslint-disable turbo/no-undeclared-env-vars */
import { createContext, FC, useEffect, useMemo, useState } from "react";
import { GenericExtensionWallet } from "@signumjs/wallets";
import { AppContextType } from "@/types/appContextType";
import { ChildrenProps } from "@/types/childrenProps";
import { MarketData } from "@/types/marketData";

const toBoolean = (v) => v === "true" || v === "1";

const IsTestnet = toBoolean(process.env.NEXT_PUBLIC_IS_TESTNET || "true");

const context: AppContextType = {
  AppName: "DeNAVAS",
  SignaSats: 0,
  Wallet: {
    Extension: new GenericExtensionWallet(),
  },
  Nostr: {
    PublicKey: "",
  },
  Ledger: {
    IsTestnet,
    DefaultNode: process.env.NEXT_PUBLIC_DEFAULT_NODE || "",
    NetworkName: IsTestnet ? "Signum-TESTNET" : "Signum",
    ExploreBaseUrl: IsTestnet
      ? "https://t-chain.signum.network"
      : "https://chain.signum.network",
  },
};

export const AppContext = createContext<AppContextType>(context);

export const AppContextProvider: FC<ChildrenProps> = ({ children }) => {
  const [marketPriceSats, setMarketPriceSats] = useState<number | null>(null);

  useEffect(() => {
    let shouldUpdate = true;
    const stored = localStorage.getItem("signa-sats");
    if (stored) {
      const { lastUpdated, sats } = JSON.parse(stored);
      setMarketPriceSats(sats);
      shouldUpdate = Date.now() - lastUpdated > 1000 * 60 * 5; // 5 minutes
    }

    if (shouldUpdate) {
      fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=btc&ids=signum&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
        .then((res) => {
          return !res.ok ? Promise.reject(res.statusText) : res.json();
        })
        .then((data) => {
          const { current_price } = data[0];
          const sats = Number((current_price * 1_0000_0000).toFixed(0));
          setMarketPriceSats(sats);
          localStorage.setItem(
            "signa-sats",
            JSON.stringify({ lastUpdated: Date.now(), sats })
          );
        })
        .catch(console.error);
    }
  }, []);

  const contextValue = useMemo(() => {
    return {
      ...context,
      SignaSats: marketPriceSats,
    } as AppContextType;
  }, [marketPriceSats]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
