"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Link_1 = require("Common/UI/Base/Link");
const ErrorPage_1 = require("../Base/PageTypes/ErrorPage");
const Home_1 = require("../../Domain/Routing/Home/Home");
exports.NotFound = () => {
    return (react_1.default.createElement(ErrorPage_1.ErrorPage, null,
        react_1.default.createElement("div", { className: "text-center" },
            react_1.default.createElement("h1", null, "404 - Page not found"),
            react_1.default.createElement(Link_1.RouterLink, { url: Home_1.createHomeRouteUrl() }, "back to start"))));
};
//# sourceMappingURL=NotFound.js.map