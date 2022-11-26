"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootModal = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("@headlessui/react");
const RootModal = ({ children, hideModal, isActive }) => {
    return (react_1.default.createElement(react_2.Transition, { show: isActive, appear: true },
        react_1.default.createElement(react_2.Dialog, { id: "modal", static: true, open: isActive, onClose: hideModal, className: "fixed top-0 z-50 w-screen h-screen" }, children)));
};
exports.RootModal = RootModal;
//# sourceMappingURL=RootModal.js.map