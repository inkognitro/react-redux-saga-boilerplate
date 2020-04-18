"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
exports.ErrorPage = (props) => {
    return (react_1.default.createElement("div", { className: "container" },
        react_1.default.createElement("div", { className: "row" },
            react_1.default.createElement("div", { className: "col-sm" }, props.children))));
};
//# sourceMappingURL=ErrorPage.js.map