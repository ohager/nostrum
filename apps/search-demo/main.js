import "./style.css";
import { setupNameSearch } from "./search.js";
import "nostrum-name-search";

document.querySelector("#app").innerHTML = `
  <div class="relative mx-auto max-w-lg mt-[12%] h-fit">
    <div class="watermark"></div>
    <div class="fixed right-2 top-2 w-[24px] opacity-80 hover:opacity-90 transition-opacity">
    <a href="https://github.com/ohager/nostrum" target="_blank" rel="noopener noreferrer">
    <img src="github-logo.svg" alt="Github Logo">
</a>
</div>
    <h1 class="text-4xl text-center my-4 w-full">Nostrum Search Demo!</h1>
    <p class="text-xs text-info opacity-50 py-4">
    This app demonstrates how to use the Nostr Name Search web component. It fetches a so-called
    <em>Alias</em> from the <a class="link" href="https://signum.network" rel="noreferrer noopener" target="_blank">Signum blockchain</a> and shows its content. This makes it possible to
    search for <a class="link" href="https://github.com/nostr-protocol/nips/blob/master/05.md" rel="noreferrer noopener" target="_blank">Nostr NIP05 identifiers</a> without relying on relays, i.e. a global decentralized registry
    for Nostr accounts.
    </p>
    <nostrum-name-search id="name-search" signumtld="signum"></nostrum-name-search>
    <div class="relative">
    
    <div id="output" class="mockup-code text-sm">
        <pre data-prefix="$"><code>type something...</code></pre>
    </div>
    <div class="fixed bottom-2 right-2 w-[80px]">
    <a class="opacity-60 hover:opacity-90 transition-opacity" href="https://signum.network" target="_blank" rel="noopener noreferrer">
        <img  src="/powered.svg"  alt="Powered by Signum" />
        </a>
    </div>
</div>
  </div>
`;

setupNameSearch(document.querySelector("#name-search"));
