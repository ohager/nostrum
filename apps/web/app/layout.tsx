import "../global.css";
import React from "react";
import { NavBar } from "@/components/navBar";
import { Modal } from "@/components/modal";
import config from "react-reveal/globals";
import { AppContextProvider } from "@/components/appContext";

config({ ssrFadeout: true });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
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
