import { html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import pDebounce from "p-debounce";
import PQueue from "p-queue";
import { errorStyles, inputStyles, loaderStyles, rootStyles } from "./styles";

const Defaults = {
  SignumNodeUrl: "https://europe.signum.network",
  PlaceHolder: "Type a name and hit [Enter]",
  ErrorMessage: "Name must contain only letters, numbers and/or underscore",
  NamespaceTld: "signum", // nostr
  NamePattern: "^[a-zA-Z0-9_]{1,100}$",
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
  aliasName: string;
  owner: string;
  description?: string;
  nostrPublicKey?: string;
  url?: string;
  avatar?: string;
}

export interface SearchResult {
  exactMatch: boolean;
  input: string;
  error?: string;
  matches: Match[];
}

@customElement("denavas-name-search") // <denavas-name-search />
export class DenavasNameSearch extends LitElement {
  static styles = [rootStyles, inputStyles, loaderStyles, errorStyles];

  @state()
  protected isSearching = false;
  @state()
  protected isNameValid = true;
  protected queue = new PQueue({ concurrency: 1 });

  @property({ type: String })
  signumnodeurl = Defaults.SignumNodeUrl;
  @property({ type: String })
  placeholder = Defaults.PlaceHolder;
  @property({ type: String })
  errormsg = Defaults.ErrorMessage;

  constructor() {
    super();
    this.triggerSearch = pDebounce(this.triggerSearch.bind(this), 500);
  }

  render() {
    return html` <div class="root">
      <div class="inline">
        <input
          part="input"
          type="text"
          pattern="^[a-zA-Z0-9_]{1,100}$"
          maxlength="100"
          placeholder=${this.placeholder}
          @change=${this.handleChange}
          @blur=${this.handleChange}
          @keyup=${this.handleKeypress}
        />
        <div class="loader ${this.isSearching ? "visible" : "hidden"}">
          <div></div>
          <div></div>
        </div>
      </div>
      <span part="error" class="error"
        >${!this.isNameValid ? this.errormsg : ""}&nbsp;</span
      >
    </div>`;
  }

  private handleKeypress(e: KeyboardEvent) {
    const inputElement = e.target as HTMLInputElement;
    const name = inputElement.value.toLowerCase();

    this.dispatchEvent(
      new CustomEvent("change", {
        bubbles: true,
        composed: true,
        detail: name,
      })
    );

    this.isNameValid = !name ? true : inputElement.checkValidity();
    if (!name) return;
    if (e.key === "Enter" && name.length > 1 && !this.isSearching) {
      e.preventDefault();
      this.triggerSearch(name);
    }
  }

  private triggerSearch(name: string) {
    this.queue.add(async () => {
      this.dispatchEvent(
        new CustomEvent("search-started", {
          bubbles: true,
          composed: true,
          detail: name,
        })
      );
      const result = await this.searchAlias(name);
      this.dispatchEvent(
        new CustomEvent("search-done", {
          bubbles: true,
          composed: true,
          detail: result,
        })
      );
    });
  }

  private handleChange(e: InputEvent) {
    const name = (e.target as HTMLInputElement).value.toLowerCase();

    if (name.length >= 2 && !this.isSearching) {
      this.triggerSearch(name);
    }
  }

  private async searchAlias(name: string) {
    try {
      this.isSearching = true;
      const response = await fetch(
        `${this.signumnodeurl}/api?requestType=getAliasesByName&aliasName=${name}`
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const json = await response.json();
      if (json.errorDescription) {
        throw new Error(json.errorDescription);
      }
      const { aliases } = json as AliasList;
      let searchResult: SearchResult = {
        exactMatch: false,
        matches: [],
        input: name,
      };
      for (let al of aliases) {
        if (al.tldName !== Defaults.NamespaceTld) {
          continue;
        }
        const aliasName = al.aliasName.toLowerCase();
        if (aliasName === name.toLowerCase()) {
          searchResult.exactMatch = true;
        }
        let match: Match = {
          aliasId: al.alias,
          owner: al.account,
          aliasName,
        };
        try {
          const content = JSON.parse(al.aliasURI);
          const avatar = content.av ? Object.keys(content.av) : [];
          match.nostrPublicKey = content.xnostr;
          match.description = content.ds;
          match.avatar = avatar.length ? avatar[0] : undefined; // IPFS CID
          match.url = content.hp;
        } catch (e) {
          // ignore - not SRC44
        }
        searchResult.matches.push(match);
      }
      return searchResult;
    } catch (e: any) {
      console.error("[Denavas Search Error] - ", e.message);
      return {
        exactMatch: false,
        input: name,
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
