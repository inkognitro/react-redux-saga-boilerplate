"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_1 = require("react-router");
exports.Router = (props) => {
    return (react_1.default.createElement(react_router_1.Router, { history: props.history },
        react_1.default.createElement(react_router_1.Switch, null,
            props.specification.routeComponents.map((routeComponent) => (react_1.default.createElement(react_router_1.Route, { key: routeComponent.route.urlSchema, path: routeComponent.route.urlSchema, exact: routeComponent.route.urlMustMatchExactly, component: routeComponent.component }))),
            react_1.default.createElement(react_router_1.Route, { key: "5f857a7f-2452-4dd5-9cfb-f8c89c69260a", path: "*", component: props.specification.defaultComponent }))));
};
//# sourceMappingURL=Router.js.map