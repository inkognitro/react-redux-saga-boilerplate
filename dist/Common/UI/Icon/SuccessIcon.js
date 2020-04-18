"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Icon_1 = require("Common/UI/Icon/Icon");
const Done_1 = __importDefault(require("@material-ui/icons/Done"));
const StyledDoneIcon = Icon_1.createStyledIcon(Done_1.default);
exports.SuccessIcon = (props) => {
    const baseIconProps = Icon_1.createBaseIconProps(props);
    return (react_1.default.createElement(StyledDoneIcon, Object.assign({}, baseIconProps)));
};
//# sourceMappingURL=SuccessIcon.js.map