"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
class Card extends react_1.Component {
    renderTitle() {
        if (!this.props.title) {
            return null;
        }
        return (react_1.default.createElement("h5", { className: "card-title" }, this.props.title));
    }
    render() {
        return (react_1.default.createElement("div", { className: 'card' + (this.props.className ? ' ' + this.props.className : '') },
            react_1.default.createElement("div", { className: "card-body" },
                this.renderTitle(),
                this.props.children)));
    }
}
exports.Card = Card;
//# sourceMappingURL=Card.js.map