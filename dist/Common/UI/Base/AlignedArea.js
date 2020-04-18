"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const StyledAlignedAreaDiv = styled_components_1.default.div `
    display: table;
    height:100%;
    width: 100%;
`;
const StyledAlignedAreaContent = styled_components_1.default.div `
    display: table-cell;
    horizontal-align: ${(props) => (props.horizontalAlign || horizontalAligns.LEFT)}
    vertical-align: ${(props) => (props.verticalAlign || verticalAligns.TOP)}
`;
var verticalAligns;
(function (verticalAligns) {
    verticalAligns["TOP"] = "top";
    verticalAligns["MIDDLE"] = "middle";
    verticalAligns["BOTTOM"] = "bottom";
})(verticalAligns = exports.verticalAligns || (exports.verticalAligns = {}));
var horizontalAligns;
(function (horizontalAligns) {
    horizontalAligns["LEFT"] = "left";
    horizontalAligns["CENTER"] = "center";
    horizontalAligns["RIGHT"] = "right";
})(horizontalAligns = exports.horizontalAligns || (exports.horizontalAligns = {}));
exports.AlignedArea = (props) => {
    return (react_1.default.createElement(StyledAlignedAreaDiv, null,
        react_1.default.createElement(StyledAlignedAreaContent, { horizontalAlign: props.horizontalAlign, verticalAlign: props.verticalAlign }, props.children)));
};
//# sourceMappingURL=AlignedArea.js.map