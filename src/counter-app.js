import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class counterApp extends DDDSuper(LitElement) {

  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.title = "Counter App";
    this.counter = 16;
    this.min = 10;
    this.max = 25;
  }

  static get properties() {
    return {
      title: { type: String },
      counter: { type: Number },
      min: { type: Number },
      max: { type: Number },
    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
        font-size: var(--counter-app-font-size, var(--ddd-font-size-s));
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      div {
        padding: 0;
        margin: 0;
      }
      .counter {
        font-size: 48px;
        color: black;
      }
      .counter.red {
        color: red;
      }
      .counter.green {
        color: green;
      }
      button {
        font-size: 24px;
        margin: 8px;
        padding: 8px 16px;
      }
      button:focus {
        outline: 2px blue;
      }
    `];
  }
  
  increment() {
    if (this.counter < this.max) {
      this.counter++;
    }
  }
  decrement() {
    if (this.counter > this.min) {
      this.counter--;
    }
  }
  updated(changedProperties) {
    if (changedProperties.has('counter')) {
      if (this.counter === 21) {
        this.makeItRain();
      }
    }
  }
  makeItRain() {
    import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(() => {
      setTimeout(() => {
        this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
      }, 0);
    });
  }

  render() {
    const counterClass = this.counter === 18 
      ? 'counter green' 
      : (this.counter === 21 || this.counter === this.max || this.counter === this.min) 
        ? 'counter red' 
        : 'counter';
  
    return html`
      <div class="wrapper">
        <div class="${counterClass}">${this.counter}</div>
        <button @click="${this.decrement}" ?disabled="${this.counter === this.min}">-</button>
        <button @click="${this.increment}" ?disabled="${this.counter === this.max}">+</button>
        <confetti-container id="confetti"></confetti-container>
      </div>
    `;
  }
}

globalThis.customElements.define(counterApp.tag, counterApp);