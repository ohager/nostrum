import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("denavas-name-search")
export class DenavasNameSearch extends LitElement {
  static styles = css`
    p {
      color: blue;
    }
  `;

  @property()
  name = "Somebody";

  render() {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "denavas-name-search": DenavasNameSearch;
  }
}
