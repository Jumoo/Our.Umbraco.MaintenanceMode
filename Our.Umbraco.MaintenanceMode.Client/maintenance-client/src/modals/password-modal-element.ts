import {
  css,
  customElement,
  html,
  state,
} from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement } from "@umbraco-cms/backoffice/modal";
import {
  PasswordModalData,
  PasswordModalValue,
} from "./password-modal-token";

@customElement("password-modal")
export class PasswordModalElement extends UmbModalBaseElement<
  PasswordModalData,
  PasswordModalValue
> {
  @state()
  private _password = "";

  #handleInput(e: Event) {
    this._password = (e.target as HTMLInputElement).value;
  }

  #handleConfirm() {
    this.value = { password: this._password };
    this.modalContext?.submit();
  }

  #handleCancel() {
    this.modalContext?.reject();
  }

  #handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      this.#handleConfirm();
    }
  }

  render() {
    return html`
      <umb-body-layout
        headline=${this.data?.headline ?? "Enter password"}
      >
        <uui-box>
          <p>${this.data?.message ?? "Enter password to unlock the site:"}</p>
          <uui-input
            type="password"
            label="Password"
            .value=${this._password}
            @input=${this.#handleInput}
            @keydown=${this.#handleKeyDown}
            autofocus
          ></uui-input>
        </uui-box>
        <div slot="actions">
          <uui-button
            id="cancel"
            look="outline"
            label="Cancel"
            @click=${this.#handleCancel}
            >Cancel</uui-button
          >
          <uui-button
            id="submit"
            color="positive"
            look="primary"
            label="Submit"
            @click=${this.#handleConfirm}
            >Submit</uui-button
          >
        </div>
      </umb-body-layout>
    `;
  }

  static styles = css`
    uui-input {
      width: 100%;
    }
  `;
}

export default PasswordModalElement;
