import React from "react";
import { useModal } from "./ModalContext";
export const ModalRoot = () => {
    const { component: Component, modalProps, hideModal, showModal } = useModal();
    return Component ? (React.createElement(Component, Object.assign({ hideModal: hideModal, showModal: showModal }, modalProps))) : null;
};
//# sourceMappingURL=ModalRoot.js.map