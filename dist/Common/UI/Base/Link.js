"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const OpenUrl_1 = require("Common/Domain/Router/Commands/OpenUrl");
const styled_components_1 = __importDefault(require("styled-components"));
const StyledLink = styled_components_1.default.a `
    color: $colorInteractive;
    text-decoration: none;
    &:hover, &:active, &:focus {
        color: ${(props) => props.theme.colorInteracting};
        text-decoration: underline;
    }
`;
exports.FunctionalLink = (props) => {
    return (react_1.default.createElement(StyledLink, { className: props.className, href: (props.url ? props.url : '#'), onClick: (event) => {
            event.preventDefault();
            props.onClick();
        } }, props.children));
};
const mapStateToProps = () => {
    return {};
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        url: props.url,
        onClick: () => dispatch(OpenUrl_1.createOpenUrl({ url: props.url, target: props.target })),
    };
};
exports.RouterLink = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(exports.FunctionalLink);
//# sourceMappingURL=Link.js.map