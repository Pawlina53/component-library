import React, { createContext, useContext, useReducer, } from "react";
const Component = ({ hideModal, showModal }) => React.createElement("div", null);
const ModalContext = createContext({
    component: Component,
    modalProps: {},
    showModal: (modal) => { },
    hideModal: () => { },
});
const { Provider, Consumer: ModalConsumer } = ModalContext;
const reducer = (state, { type, component, displayName, modalProps }) => {
    if (type === "openModal") {
        const showIndex = state.modals
            .map((x) => x.displayName)
            .indexOf(displayName);
        if (showIndex > -1 && state.modals[showIndex]) {
            const modals = [...state.modals];
            modals[showIndex].isActive = true;
            modals[showIndex].modalProps = modalProps;
            return Object.assign(Object.assign({}, state), { modals });
        }
        return Object.assign(Object.assign({}, state), { modals: [
                ...state.modals,
                ...[
                    {
                        displayName: displayName,
                        isActive: true,
                        component,
                        modalProps,
                    },
                ],
            ] });
    }
    else if (type === "hideModal") {
        const hideIndex = state.modals
            .map((x) => x.displayName)
            .indexOf(displayName);
        const modals = [...state.modals];
        if (hideIndex > -1 && state.modals[hideIndex]) {
            modals[hideIndex].isActive = false;
        }
        return Object.assign(Object.assign({}, state), { modals });
    }
    else {
        throw new Error("Unspecified action.");
    }
};
const ModalProvider = ({ children }) => {
    const initialState = {
        modals: [],
        showModal: (component, modalProps = {}) => {
            dispatch({ type: "openModal", component, modalProps });
        },
        hideModal: (displayName) => {
            dispatch({ type: "hideModal", displayName });
        },
    };
    const [state, dispatch] = useReducer(reducer, initialState);
    return (React.createElement(Provider, { value: state },
        state.modals.map((modal) => {
            const Component = modal.component;
            return (Component && (React.createElement(Component, Object.assign({}, modal.modalProps, { hideModal: () => state.hideModal(modal.component.displayName), showModal: state.showModal, isActive: modal.isActive, key: modal.displayName }))));
        }),
        children));
};
const useModal = () => useContext(ModalContext);
export { ModalContext, ModalConsumer, ModalProvider, useModal };
//# sourceMappingURL=ModalContext.js.map