export type TInitialStateType = {
  modalProps?: {};
  component?: React.ElementType;
  showModal: (
    modalComponent: React.ElementType,
    modalName: string,
    modalProps?: {}
  ) => void;
  hideModal: (modalName: string) => void;
  modals: TModal[] | [];
};

export enum ActionType {
  hideModal = "hideModal",
  openModal = "openModal",
}

export type TActionType = {
  type: ActionType;
  displayName: string;
  component?: React.ElementType;
  modalProps?: {};
};

export type TModal = {
  isActive: boolean;
  displayName: string;
  component?: React.ElementType;
  modalProps?: {};
};
