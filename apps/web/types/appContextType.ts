import { GenericExtensionWallet } from "@signumjs/wallets";

export interface AppContextType {
  AppName: string;
  Wallet: {
    Extension: GenericExtensionWallet;
  };
  Nostr: {
    PublicKey: string;
    Relays: string[];
  };
  Ledger: {
    DefaultNode: string;
    NetworkName: "Signum" | "Signum-TESTNET";
    IsTestnet: boolean;
    ExploreBaseUrl: string;
    AliasTld: string;
  };
}
