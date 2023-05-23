/* eslint-disable turbo/no-undeclared-env-vars */
import {createContext, FC} from "react";
import {GenericExtensionWallet} from "@signumjs/wallets";
import {AppContextType} from '@/types/appContextType';
import {ChildrenProps} from '@/types/childrenProps';

const toBoolean = (v) => v === 'true' || v === '1'

const IsTestnet = toBoolean(process.env.NEXT_PUBLIC_IS_TESTNET || "true")

const config: AppContextType = {
  AppName: "DeNAVAS",
  Wallet: {
    Extension: new GenericExtensionWallet(),
  },
  Ledger: {
    IsTestnet,
    DefaultNode: process.env.NEXT_PUBLIC_DEFAULT_NODE || "",
    NetworkName: IsTestnet ? "Signum-TESTNET" : 'Signum',
    ExploreBaseUrl: IsTestnet
      ? "https://t-chain.signum.network"
      : "https://chain.signum.network",
  },
};

export const AppContext = createContext<AppContextType>(config);

export const AppContextProvider: FC<ChildrenProps> = ({ children }) => {
  return <AppContext.Provider value={config}>{children}</AppContext.Provider>;
};
