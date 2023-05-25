import { html, css, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import pDebounce from "p-debounce";

const Defaults = {
  NodeHost: "https://europe.signum.network",
  PlaceHolder: "Enter a name",
  NamespaceTld: "signum", // nostr
};

interface Alias {
  account: string;
  accountRS: string;
  aliasName: string;
  timestamp: number;
  alias: string;
  aliasURI: string;
  tld: string;
  tldName: string;
}

interface AliasList {
  aliases: Alias[];
}

interface Match {
  aliasId: string;
  owner: string;
  description?: string;
  nostrPublicKey?: string;
  name?: string;
  url?: string;
  avatar?: string;
}

interface SearchResult {
  exactMatch: boolean;
  error?: string;
  matches: Match[];
}

@customElement("denavas-name-search")
export class DenavasNameSearch extends LitElement {
  static styles = css`
    input {
      border-radius: 4px;
      font-size: 2rem;
    }

    input:invalid {
      border: red solid 3px;
    }

    .hidden {
      visibility: hidden;
      opacity: 0;
    }
    .visible {
      visibility: visible;
      opacity: 1;
    }
  `;

  @state()
  protected isSearching = false;

  @property({ type: String })
  nodeHost = Defaults.NodeHost;
  @property({ type: String })
  placeholder = Defaults.PlaceHolder;

  constructor() {
    super();
    this.searchAlias = pDebounce(this.searchAlias.bind(this), 1000);
  }

  render() {
    console.log("isSearching", this.isSearching);

    return html` <div>
      <input
        type="text"
        pattern="^[a-zA-Z0-9_]{1,100}$"
        aria-errormessage=""
        placeholder=${this.placeholder}
        @change=${this.handleChange}
        @blur=${this.handleChange}
        @keypress=${this.handleChange}
      />
      <div class="${this.isSearching ? "visible" : "hidden"}">*</div>
    </div>`;
  }

  private async handleChange(e: InputEvent) {
    const name = (e.target as HTMLInputElement).value;
    if (name.length < 2) return;
    const result = await this.searchAlias(name);
    const event = new CustomEvent("search-done", {
      bubbles: true,
      composed: true,
      detail: result,
    });
    this.dispatchEvent(event);
  }

  private async searchAlias(name: string) {
    try {
      this.isSearching = true;
      const response = await fetch(
        `${this.nodeHost}/api?requestType=getAliasesByName&aliasName=${name}`
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const json = await response.json();
      if (json.errorDescription) {
        throw new Error(json.errorDescription);
      }
      const { aliases } = json as AliasList;
      let searchResult: SearchResult = { exactMatch: false, matches: [] };
      for (let al of aliases) {
        if (al.tldName !== Defaults.NamespaceTld) {
          continue;
        }
        if (al.aliasName === name) {
          searchResult.exactMatch = true;
        }
        let match: Match = {
          aliasId: al.alias,
          owner: al.account,
        };
        try {
          const content = JSON.parse(al.aliasURI);
          const avatar = content.av ? Object.keys(content.av) : [];
          match.nostrPublicKey = content.xnostr;
          match.description = content.ds;
          match.avatar = avatar.length ? avatar[0] : undefined; // IPFS CID
          match.url = content.hp;
          match.name = content.nm;
        } catch (e) {
          // ignore - not SRC44
        }
        searchResult.matches.push(match);
        return searchResult;
      }
    } catch (e: any) {
      console.error("[Denavas Search Error] - ", e.message);
      return {
        exactMatch: false,
        matches: [],
        error: e.message,
      } as SearchResult;
    } finally {
      this.isSearching = false;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "denavas-name-search": DenavasNameSearch;
  }
}
