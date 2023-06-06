import { global } from "styled-jsx/css";

type NostrRelay = Record<string, { read: boolean; write: boolean }>;

declare global {
  interface Nostr {
    getPublicKey: () => Promise<string>;
    getRelays: () => Promise<string[]>;
  }
  interface Window extends globalThis {
    nostr: Nostr;
  }
}

window.nostr = window.nostr || {};
