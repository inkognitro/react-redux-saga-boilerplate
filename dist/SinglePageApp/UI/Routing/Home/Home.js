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
const Link_1 = require("Common/UI/Base/Link");
const Types_1 = require("Common/Domain/Toaster/Types");
const ShowMessage_1 = require("Common/Domain/Toaster/Command/ShowMessage");
const react_redux_1 = require("react-redux");
const ContentPage_1 = require("../../Base/PageTypes/ContentPage");
const LeakReduxState_1 = require("../../../Domain/Routing/Home/Command/LeakReduxState");
const FormGroup_1 = require("Common/UI/Form/FormGroup");
const Label_1 = require("Common/UI/Form/Label");
const Login_1 = require("Common/Domain/Authentication/Command/Login");
const TextField_1 = require("Common/UI/Form/Element/TextField");
class DumbHome extends react_1.Component {
    render() {
        return (react_1.default.createElement(ContentPage_1.ContentPage, null,
            react_1.default.createElement("h1", null, "Features"),
            react_1.default.createElement("br", null),
            react_1.default.createElement("br", null),
            react_1.default.createElement("h3", null, "Routing"),
            react_1.default.createElement("div", null,
                react_1.default.createElement(Link_1.RouterLink, { url: "/some-page-which-does-not-exist" }, "go to non existing page")),
            react_1.default.createElement("br", null),
            react_1.default.createElement("h3", null, "Authentication"),
            react_1.default.createElement(Link_1.FunctionalLink, { onClick: this.props.onClickLogin }, "Login"),
            react_1.default.createElement("br", null),
            react_1.default.createElement("br", null),
            react_1.default.createElement("h3", null, "Toasts"),
            react_1.default.createElement("div", null,
                react_1.default.createElement(Link_1.FunctionalLink, { onClick: () => this.props.onAddToast(Types_1.ToastTypes.SUCCESS, this.props.toastContent) }, "add a success toast message"),
                " (is being closed after 3 seconds)"),
            react_1.default.createElement("div", null,
                react_1.default.createElement(Link_1.FunctionalLink, { onClick: () => this.props.onAddToast(Types_1.ToastTypes.INFO, this.props.toastContent) }, "add an info toast message")),
            react_1.default.createElement("div", null,
                react_1.default.createElement(Link_1.FunctionalLink, { onClick: () => this.props.onAddToast(Types_1.ToastTypes.WARNING, this.props.toastContent) }, "add a warning toast message")),
            react_1.default.createElement("div", null,
                react_1.default.createElement(Link_1.FunctionalLink, { onClick: () => this.props.onAddToast(Types_1.ToastTypes.ERROR, this.props.toastContent) }, "add an error toast message")),
            react_1.default.createElement("br", null),
            react_1.default.createElement(FormGroup_1.FormGroup, null,
                react_1.default.createElement(Label_1.Label, { title: 'Toast content: ' + this.props.toastContent, formElementId: "toastContentTextField" }),
                react_1.default.createElement(TextField_1.TextField, { stateSelector: (state) => state.routing.home.toastContentField })),
            react_1.default.createElement("br", null),
            react_1.default.createElement("h3", null, "Redux"),
            react_1.default.createElement("div", null,
                react_1.default.createElement(Link_1.FunctionalLink, { onClick: this.props.onClickLeakReduxState }, "leak redux state in console"))));
    }
}
const mapStateToProps = (state) => {
    return {
        toastContent: state.routing.home.toastContentField.value,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onClickLogin: () => dispatch(Login_1.createLogin({
            username: 'sonGoku',
            password: '1234',
            shouldRemember: false,
        })),
        onAddToast: (type, content) => dispatch(ShowMessage_1.createShowMessage({
            content: content,
            toastType: type,
        })),
        onClickLeakReduxState: () => dispatch(LeakReduxState_1.createLeakReduxState()),
    };
};
exports.Home = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(DumbHome);
//# sourceMappingURL=Home.js.map