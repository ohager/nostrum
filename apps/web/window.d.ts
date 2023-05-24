import { global } from "styled-jsx/css";

declare global {
  interface Nostr {
    getPublicKey: () => Promise<string>;
  }
  interface Window extends globalThis {
    nostr: Nostr;
  }
}

window.nostr = window.nostr || {};
