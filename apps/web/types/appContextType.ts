import { GenericExtensionWallet } from "@signumjs/wallets";

export interface AppContextType {
  AppName: "DeNAVAS";
  SignaSats: number;
  Wallet: {
    Extension: GenericExtensionWallet;
  };
  Nostr: {
    PublicKey: string;
  };
  Ledger: {
    DefaultNode: string;
    NetworkName: "Signum" | "Signum-TESTNET";
    IsTestnet: boolean;
    ExploreBaseUrl: string;
    AliasTld: string;
  };
}
