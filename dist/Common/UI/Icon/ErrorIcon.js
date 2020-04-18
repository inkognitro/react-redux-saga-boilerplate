"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Icon_1 = require("Common/UI/Icon/Icon");
const Error_1 = __importDefault(require("@material-ui/icons/Error"));
const StyledMaterialErrorIcon = Icon_1.createStyledIcon(Error_1.default);
exports.ErrorIcon = (props) => {
    const baseIconProps = Icon_1.createBaseIconProps(props);
    return (react_1.default.createElement(StyledMaterialErrorIcon, Object.assign({}, baseIconProps)));
};
//# sourceMappingURL=ErrorIcon.js.map