import { css, customElement, html } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement } from "@umbraco-cms/backoffice/modal";
import { InfoModalData, InfoModalValue } from "./info-modal-token";

@customElement("info-modal")
export class InfoModalElement extends UmbModalBaseElement<
  InfoModalData,
  InfoModalValue
> {
  #handleConfirm() {
    this.modalContext?.submit();
  }

  render() {
    return html`
      <uui-dialog-layout class="uui-text" .headline=${this.data?.headline}>
        ${this.data?.message}

        <uui-button
          slot="actions"
          id="confirm"
          color=${this.data?.color ?? "positive"}
          look="primary"
          label=${this.data?.confirmLabel ?? "OK"}
          @click=${this.#handleConfirm}
        ></uui-button>
      </uui-dialog-layout>
    `;
  }

  static styles = css`
    uui-dialog-layout {
      max-inline-size: 60ch;
    }
  `;
}

export default InfoModalElement;
