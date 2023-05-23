import {GenericExtensionWallet} from '@signumjs/wallets';

export interface AppContextType {
    AppName: "DeNAVAS",
    Wallet: {
        Extension: GenericExtensionWallet;
    };
    Ledger: {
        DefaultNode: string;
        NetworkName: "Signum" | "Signum-TESTNET"
        IsTestnet: boolean;
        ExploreBaseUrl: string;
    };
}
