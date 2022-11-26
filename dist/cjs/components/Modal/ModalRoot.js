"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalRoot = void 0;
const react_1 = __importDefault(require("react"));
const ModalContext_1 = require("./ModalContext");
const ModalRoot = () => {
    const { component: Component, modalProps, hideModal, showModal } = (0, ModalContext_1.useModal)();
    return Component ? (react_1.default.createElement(Component, Object.assign({ hideModal: hideModal, showModal: showModal }, modalProps))) : null;
};
exports.ModalRoot = ModalRoot;
//# sourceMappingURL=ModalRoot.js.map