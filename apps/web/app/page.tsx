import React from "react";
import { Metadata } from "next";
import { Home } from "../features/home";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nostrum.network"),
  title: "Nostrum - Free Nostr IDs",
  applicationName: "Nostrum ",
  keywords: [
    "nostr",
    "nip05",
    "signum",
    "web3",
    "blockchain",
    "decentralized technology",
    "decentralized identity",
  ],
  viewport: {
    minimumScale: 1,
    viewportFit: "cover",
    userScalable: false,
    initialScale: 1,
    width: "device-width",
  },
  description:
    "Get your global and decentralized Nostr Identifier (NIP05) for free! The Signum blockchain provides you a decentralized Id (Alias), which you own without the need of a centralized domain. Be discoverable worldwide, independent of Nostr relays. Your keys, Your Id!",
};
export default function Page() {
  return (
    <div>
      <Home />
    </div>
  );
}
