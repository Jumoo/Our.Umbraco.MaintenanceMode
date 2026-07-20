import { UmbModalToken } from "@umbraco-cms/backoffice/modal";

export interface PasswordModalData {
  headline?: string;
  message?: string;
}

export interface PasswordModalValue {
  password: string;
}

export const PASSWORD_MODAL = new UmbModalToken<
  PasswordModalData,
  PasswordModalValue
>("password.modal", {
  modal: {
    type: "dialog",
  },
});
