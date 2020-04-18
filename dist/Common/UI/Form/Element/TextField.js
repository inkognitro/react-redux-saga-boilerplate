"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Types_1 = require("Common/Domain/Form/Element/TextField/Types");
const Messages_1 = require("Common/UI/Form/Messages");
const react_redux_1 = require("react-redux");
const TextFieldStateWasChanged_1 = require("Common/Domain/Form/Element/TextField/Event/TextFieldStateWasChanged");
function createHtmlInputTypeByTextFieldType(type) {
    if (type === Types_1.Types.PASSWORD) {
        return 'password';
    }
    if (type === Types_1.Types.EMAIL) {
        return 'email';
    }
    return 'text';
}
const DumbTextField = (props) => {
    const onChange = (props.data.readOnly ? undefined : (event) => {
        props.onChange(props.data.id, Object.assign(Object.assign({}, props.data), { value: event.target.value }));
    });
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("input", { id: props.data.id, className: "form-control", type: createHtmlInputTypeByTextFieldType(props.data.type), value: props.data.value, onChange: onChange, readOnly: props.data.readOnly }),
        react_1.default.createElement(Messages_1.Messages, { messages: props.data.messages })));
};
const mapStateToProps = (rootState, props) => {
    return {
        data: props.stateSelector(rootState),
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onChange: (textFieldId, textFieldState) => dispatch(TextFieldStateWasChanged_1.createTextFieldStateWasChanged(textFieldId, textFieldState)),
    };
};
exports.TextField = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(DumbTextField);
//# sourceMappingURL=TextField.js.map