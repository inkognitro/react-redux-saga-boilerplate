"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Icon_1 = require("Common/UI/Icon/Icon");
const Close_1 = __importDefault(require("@material-ui/icons/Close"));
const StyledCloseIcon = Icon_1.createStyledIcon(Close_1.default);
exports.CloseIcon = (props) => {
    const baseIconProps = Icon_1.createBaseIconProps(props);
    return (react_1.default.createElement(StyledCloseIcon, Object.assign({}, baseIconProps)));
};
//# sourceMappingURL=CloseIcon.js.map