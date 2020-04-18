"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const ThemedApp_1 = require("SinglePageApp/UI/ThemedApp");
require("bootstrap/scss/bootstrap.scss");
const CSSPlugin_1 = require("gsap/CSSPlugin");
const plugins = [CSSPlugin_1.CSSPlugin];
exports.RootComponent = (props) => {
    return (react_1.default.createElement(react_redux_1.Provider, { store: props.store },
        react_1.default.createElement(ThemedApp_1.ThemedApp, { history: props.history })));
};
//# sourceMappingURL=App.js.map