import "./style.css";
import { setupNameSearch } from "./search.js";
import "nostrum-name-search";

const NodeHost = "https://europe.signum.network";

document.querySelector("#app").innerHTML = `
    <div class="watermark"></div>
  <div class="relative mx-auto max-w-2xl w-full mt-[12%] h-fit">
    <div class="fixed right-2 top-2 w-[24px] opacity-80 hover:opacity-90 transition-opacity">
    <div class="flex flex-row justify-end items-center">
    
      <a href="https://github.com/ohager/nostrum" target="_blank" rel="noopener noreferrer">
          <img src="/github-logo.svg" alt="Github Logo">
      </a>
</div>
    </div>
    <h1 class="text-4xl text-center my-4 w-full">Nostrum Name Search</h1>
    <p class="text-sm text-info opacity-50 py-4">
    This app demonstrates how to use the <a class="link" target="_blank" rel="noreferrer noopener" href="https://github.com/ohager/nostrum/blob/main/packages/nostrum-name-search/README.md">Nostr Name Search web component.</a> It fetches a so-called
    <em>Alias</em> from the <a class="link" href="https://signum.network" rel="noreferrer noopener" target="_blank">Signum blockchain</a> and shows its content. This makes it possible to
    search for <a class="link" href="https://github.com/nostr-protocol/nips/blob/master/05.md" rel="noreferrer noopener" target="_blank">Nostr NIP05 identifiers</a> without relying on relays, i.e. a global decentralized registry
    for Nostr accounts.
    </p>
    
    <div class="text-center py-4">
      <a href="https://nostrum.network" rel="noopener noreferrer" target="_blank">
          <button class="btn btn-accent">Get Your Name!</button>
      </a>
    </div>
    
    <!-- here we use the web component -->
    <div class="relative">
        <small id="name-count" class="text-xs text-gray-500 right-2">&nbsp;</small>
        <nostrum-name-search id="name-search"></nostrum-name-search>
    </div>
    <div class="relative">
    <div id="output" class="mockup-code text-sm">
        <pre data-prefix="$"><code>type something...</code></pre>
    </div>
    <div class="fixed bottom-2 right-2 w-[120px]">
    <a class="opacity-60 hover:opacity-90 transition-opacity" href="https://signum.network" target="_blank" rel="noopener noreferrer">
        <img  src="/powered.svg"  alt="Powered by Signum" />
        </a>
    </div>
</div>
  </div>
`;

async function countNames() {
  const result = await fetch(`${NodeHost}/api?requestType=getTLDs`);
  if (!result.ok) return;
  const { tlds } = await result.json();
  const tld = tlds.find((tld) => tld.aliasName === "nostr");
  if (!tld) return;
  document.querySelector(
    "#name-count"
  ).textContent = `${tld.numberOfAliases} names registered`;
}

(async () => {
  // And here we interact with the component
  setupNameSearch(document.querySelector("#name-search"));
  countNames().then();
})();
