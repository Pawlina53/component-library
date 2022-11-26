import { ReactElement } from "react";

export type TRootModal = {
  children: ReactElement;
  hideModal: () => {};
  isActive: boolean;
};

export type TModalReducer = {
  type: "openModal" | "hideModal";
  component?: any;
  displayName?: string;
  modalProps?: any;
  isActive?: boolean;
};

export type TModalComponent = {
  displayName: string;
};
