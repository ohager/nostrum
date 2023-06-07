import "../global.css";
import React from "react";
import { NavBar } from "@/components/navBar";
import { Modal } from "@/components/modal";
import config from "react-reveal/globals";
import { AppContextProvider } from "@/components/appContext";
import { MetaTags } from "@/components/metatags";

config({ ssrFadeout: true });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <MetaTags
        title="Nostrum"
        description="Get your global and decentralized Nostr Identifier (NIP05) for free!"
        keywords="nostr, nip05, signum, web3, blockchain, decentralized technology"
        imgUrl="https://nostrum.network/img/nostrum-seo.jpg"
        viewport="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />
      <body className="scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-neutral scrollbar-thumb-rounded-xl">
        <AppContextProvider>
          <NavBar />
          <>{children}</>
          <Modal />
        </AppContextProvider>
      </body>
    </html>
  );
}
