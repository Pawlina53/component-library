import React from "react";
import { Dialog, Transition } from "@headlessui/react";

const RootModal = ({ children, isActive, hideModal }: any) => {
  return (
    <Transition show={isActive} appear>
      <Dialog
        id="modal"
        static
        open={isActive}
        onClose={hideModal}
        style={{
          position: `absolute`,
          top: `0`,
          left: `0`,
          width: `100%`,
          height: `100%`,
        }}
      >
        {children}
      </Dialog>
    </Transition>
  );
};

export default RootModal;
