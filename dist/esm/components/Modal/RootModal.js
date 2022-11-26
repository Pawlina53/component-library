import React from "react";
import { Dialog, Transition } from "@headlessui/react";
export const RootModal = ({ children, hideModal, isActive }) => {
    return (React.createElement(Transition, { show: isActive, appear: true },
        React.createElement(Dialog, { id: "modal", static: true, open: isActive, onClose: hideModal, className: "fixed top-0 z-50 w-screen h-screen" }, children)));
};
//# sourceMappingURL=RootModal.js.map