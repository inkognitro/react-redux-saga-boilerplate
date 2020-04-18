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
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const Link_1 = require("Common/UI/Base/Link");
const Home_1 = require("../../Domain/Routing/Home/Home");
const CurrentAuthUserQuery_1 = require("Common/Domain/Authentication/Query/CurrentAuthUserQuery");
class RepresentationalNavBar extends react_1.Component {
    renderCurrentUserNavItem() {
        if (!this.props.currentUser) {
            return;
        }
        return (react_1.default.createElement("li", { className: "nav-item" },
            react_1.default.createElement(Link_1.FunctionalLink, { className: "nav-link", onClick: () => this.props.onClickLogout() },
                "Logout ",
                this.props.currentUser.user.username)));
    }
    render() {
        return (react_1.default.createElement("ul", { className: "nav justify-content-center" },
            react_1.default.createElement("li", { className: "nav-item" },
                react_1.default.createElement(react_router_dom_1.NavLink, { className: "nav-link", to: Home_1.createHomeRouteUrl() }, "Home")),
            (this.props.currentUser ? null : (react_1.default.createElement("li", { className: "nav-item" },
                react_1.default.createElement(react_router_dom_1.NavLink, { className: "nav-link", to: "foo" }, "Login")))),
            this.renderCurrentUserNavItem()));
    }
}
const mapStateToProps = (state) => {
    return {
        currentUser: CurrentAuthUserQuery_1.findCurrentAuthUser(state.authentication)
    };
};
const mapDispatchToProps = ({}) => {
    return {
        onClickLogout: () => console.log('logout'),
    };
};
exports.NavBar = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(RepresentationalNavBar);
//# sourceMappingURL=NavBar.js.map