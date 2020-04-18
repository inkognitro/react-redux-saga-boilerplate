"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const Toaster_1 = require("SinglePageApp/UI/Base/Toaster");
const Router_1 = require("SinglePageApp/UI/Routing/Router");
const Loader_1 = require("SinglePageApp/UI/Base/Loader");
const styled_components_1 = require("styled-components");
const ThemeQuery_1 = require("Common/Domain/Design/Query/ThemeQuery");
require("bootstrap/scss/bootstrap.scss");
const DumbThemedApp = (props) => {
    return (react_1.default.createElement(styled_components_1.ThemeProvider, { theme: props.theme },
        react_1.default.createElement(Router_1.Router, { history: props.history }),
        react_1.default.createElement(Toaster_1.Toaster, null),
        react_1.default.createElement(Loader_1.Loader, null)));
};
const mapStateToProps = (rootState, props) => {
    return {
        theme: ThemeQuery_1.getTheme(rootState.design),
        history: props.history,
    };
};
exports.ThemedApp = react_redux_1.connect(mapStateToProps)(DumbThemedApp);
//# sourceMappingURL=ThemedApp.js.map