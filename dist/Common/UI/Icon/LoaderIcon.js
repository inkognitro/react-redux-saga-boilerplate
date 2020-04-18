"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Icon_1 = require("Common/UI/Icon/Icon");
const HourglassEmpty_1 = __importDefault(require("@material-ui/icons/HourglassEmpty"));
const StyledLoaderIcon = Icon_1.createStyledIcon(HourglassEmpty_1.default);
exports.LoaderIcon = (props) => {
    const baseIconProps = Icon_1.createBaseIconProps(props);
    return (react_1.default.createElement(StyledLoaderIcon, Object.assign({}, baseIconProps)));
};
//# sourceMappingURL=LoaderIcon.js.map