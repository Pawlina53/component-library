import React from "react";
import { useModal } from "./ModalContext";

export const ModalRoot = () => {
  const { component: Component, modalProps, hideModal, showModal } = useModal();

  return Component ? (
    <Component hideModal={hideModal} showModal={showModal} {...modalProps} />
  ) : null;
};
