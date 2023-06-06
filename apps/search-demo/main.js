import "./style.css";
import { setupNameSearch } from "./search.js";
import "nostrum-name-search";

document.querySelector("#app").innerHTML = `
  <div class="mx-auto max-w-lg mt-[12%]">
    <h1 class="text-4xl text-center my-4 w-full">Hello Nostrum Search!</h1>
    <nostrum-name-search id="name-search"></nostrum-name-search>
    <div id="output" class="mockup-code">
    <pre data-prefix="$"><code>type something...</code></pre>
    </div>
  </div>
`;

setupNameSearch(document.querySelector("#name-search"));
