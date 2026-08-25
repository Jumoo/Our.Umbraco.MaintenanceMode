import { UmbModalToken } from "@umbraco-cms/backoffice/modal";

export interface InfoModalData {
  headline: string;
  message: string;
  color?: "positive" | "danger" | "warning";
  confirmLabel?: string;
}

export type InfoModalValue = undefined;

export const INFO_MODAL = new UmbModalToken<InfoModalData, InfoModalValue>(
  "info.modal",
  {
    modal: {
      type: "dialog",
    },
  },
);
