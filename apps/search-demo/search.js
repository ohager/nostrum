import { prettyPrintJson } from "pretty-print-json";

function getOutputElement() {
  return document.querySelector("#output");
}

function renderWhileSearching(name) {
  getOutputElement().innerHTML = `<pre prefix="$"<code class="text-info">Searching for ${name}...</code></pre>
`;
}

function renderResult(result) {
  const resultList = result.matches.filter((r) => !!r.nostrPublicKey);

  const htmlList = resultList.map(
    (r, index) =>
      `<pre data-prefix=${index + 1} class="pl-6"><code class="text-accent">${
        r.aliasName
      }@signum.network</code></pre>`
  );

  getOutputElement().innerHTML = `
        <pre data-prefix="$"><code class="text-info">Finished search with following result</code></pre>
        <pre data-prefix=">"><code class="text-info">Found ${
          resultList.length
        } Nostr Account(s)</code></pre>
        ${htmlList}
        <pre data-prefix=">"><code>Complete Match List:</code></pre>
        <pre data-prefix=""><code><div class="pl-6">${prettyPrintJson.toHtml(
          result
        )}</div></code></pre>
`;
}

function renderEmptyName() {
  getOutputElement().innerHTML = `<pre data-prefix="$"><code>type something...</code></pre>`;
}

export function setupNameSearch(element) {
  // just in case you want to react on change
  element.addEventListener("change", (e) => {
    if (!e.detail) {
      renderEmptyName();
    }
  });

  // Start Searching Event
  element.addEventListener("search-started", (e) => {
    const searchName = e.detail;
    console.log("Start Searching for", searchName);
    renderWhileSearching(searchName);
  });

  // Results on end
  element.addEventListener("search-done", (e) => {
    const result = e.detail;
    console.log("Got these results", result);
    renderResult(result);
  });
}
