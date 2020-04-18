"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Router_1 = require("Common/UI/Router/Router");
const NotFound_1 = require("./NotFound");
const react_1 = __importDefault(require("react"));
const Home_1 = require("./Home/Home");
const Home_2 = require("SinglePageApp/Domain/Routing/Home/Home");
const specification = {
    routeComponents: [
        { route: Home_2.homeRoute, component: Home_1.Home },
    ],
    defaultComponent: NotFound_1.NotFound,
};
exports.Router = (props) => {
    return (react_1.default.createElement(Router_1.Router, { specification: specification, history: props.history }));
};
//# sourceMappingURL=Router.js.map