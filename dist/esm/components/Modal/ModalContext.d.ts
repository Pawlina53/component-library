import React from "react";
declare const ModalContext: React.Context<{
    component: ({ hideModal, showModal }: {
        hideModal: any;
        showModal: any;
    }) => JSX.Element;
    modalProps: {};
    showModal: () => void;
    hideModal: () => void;
}>;
declare const ModalConsumer: React.Consumer<{
    component: ({ hideModal, showModal }: {
        hideModal: any;
        showModal: any;
    }) => JSX.Element;
    modalProps: {};
    showModal: () => void;
    hideModal: () => void;
}>;
declare const ModalProvider: ({ children }: any) => JSX.Element;
declare const useModal: () => {
    component: ({ hideModal, showModal }: {
        hideModal: any;
        showModal: any;
    }) => JSX.Element;
    modalProps: {};
    showModal: () => void;
    hideModal: () => void;
};
export { ModalContext, ModalConsumer, ModalProvider, useModal };
