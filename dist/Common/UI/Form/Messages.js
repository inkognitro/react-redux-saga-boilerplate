"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Types_1 = require("Common/Domain/Form/Element/Types");
const ErrorIcon_1 = require("Common/UI/Icon/ErrorIcon");
const Icon_1 = require("Common/UI/Icon/Icon");
const Message = (props) => {
    if (props.message.type === Types_1.MessageTypes.ERROR) {
        return (react_1.default.createElement("small", { className: "text-danger" },
            react_1.default.createElement(ErrorIcon_1.ErrorIcon, { size: Icon_1.IconSizes.XS, type: Icon_1.IconTypes.ERROR }),
            " ",
            props.message.content));
    }
    return (react_1.default.createElement("small", { className: "text-info" }, props.message.content));
};
exports.Messages = (props) => {
    if (props.messages.length === 0) {
        return null;
    }
    return (react_1.default.createElement(react_1.default.Fragment, null, props.messages.map((message) => (react_1.default.createElement(Message, { key: message.id, message: message })))));
};
//# sourceMappingURL=Messages.js.map