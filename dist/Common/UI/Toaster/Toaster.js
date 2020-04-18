"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Toast_1 = require("./Toast");
const styled_components_1 = __importDefault(require("styled-components"));
const StyledToastsContainer = styled_components_1.default.div `
    position: fixed;
    right: 0;
    top: 0;
    height: 0;
`;
exports.Toaster = (props) => {
    return (react_1.default.createElement(StyledToastsContainer, null, props.toasts.map((toast) => (react_1.default.createElement(Toast_1.Toast, { key: toast.id, toast: toast, onRemoveMessage: (messageId) => props.onRemoveMessage(messageId) })))));
};
//# sourceMappingURL=Toaster.js.map