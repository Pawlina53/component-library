import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { TRootModal } from "./Modal.types";

export const RootModal = ({ children, hideModal, isActive }: TRootModal) => {
  return (
    <Transition show={isActive} appear>
      <Dialog
        id="modal"
        static
        open={isActive}
        onClose={hideModal}
        className="fixed top-0 z-50 w-screen h-screen"
      >
        {children}
      </Dialog>
    </Transition>
  );
};
