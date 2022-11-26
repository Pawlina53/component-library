"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useModal = exports.ModalProvider = exports.ModalConsumer = exports.ModalContext = void 0;
const react_1 = __importStar(require("react"));
const Component = ({ hideModal, showModal }) => react_1.default.createElement("div", null);
const ModalContext = (0, react_1.createContext)({
    component: Component,
    modalProps: {},
    showModal: (modal) => { },
    hideModal: () => { },
});
exports.ModalContext = ModalContext;
const { Provider, Consumer: ModalConsumer } = ModalContext;
exports.ModalConsumer = ModalConsumer;
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
    const [state, dispatch] = (0, react_1.useReducer)(reducer, initialState);
    return (react_1.default.createElement(Provider, { value: state },
        state.modals.map((modal) => {
            const Component = modal.component;
            return (Component && (react_1.default.createElement(Component, Object.assign({}, modal.modalProps, { hideModal: () => state.hideModal(modal.component.displayName), showModal: state.showModal, isActive: modal.isActive, key: modal.displayName }))));
        }),
        children));
};
exports.ModalProvider = ModalProvider;
const useModal = () => (0, react_1.useContext)(ModalContext);
exports.useModal = useModal;
//# sourceMappingURL=ModalContext.js.map