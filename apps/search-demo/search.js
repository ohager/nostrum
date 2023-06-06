import { prettyPrintJson } from "pretty-print-json";

function getOutputElement() {
  return document.querySelector("#output");
}

function renderWhileSearching(name) {
  getOutputElement().innerHTML = `<pre prefix="$"<code class="text-info">Searching for ${name}...</code></pre>
`;
}

function renderResult(result) {
  getOutputElement().innerHTML = `
        <pre data-prefix="$"><code class="text-success">Finished search with following result</code></pre>
        <pre data-prefix=">"><code><div class="pl-6">${prettyPrintJson.toHtml(
          result
        )}</div></code></pre>
`;
}

export function setupNameSearch(element) {
  // just in case you want to react on change
  element.addEventListener("change", console.log);

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
