"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function createContentClassName(props) {
    let classNames = ['btn', 'btn-secondary'];
    if (props.isDisabled) {
        classNames.push('disabled');
    }
    return classNames.join(' ');
}
exports.SecondaryButton = (props) => {
    return (react_1.default.createElement("button", { type: "button", className: createContentClassName(props), onClick: props.onClick }, props.children));
};
//# sourceMappingURL=SecondaryButton.js.map