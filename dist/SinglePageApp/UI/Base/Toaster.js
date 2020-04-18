"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const Toaster_1 = require("Common/UI/Toaster/Toaster");
const RemoveMessage_1 = require("Common/Domain/Toaster/Command/RemoveMessage");
const ToastQuery_1 = require("Common/Domain/Toaster/Query/ToastQuery");
const mapStateToProps = (rootState) => {
    return {
        toasts: ToastQuery_1.getAllToasts(rootState.toaster),
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onRemoveMessage: (messageId) => dispatch(RemoveMessage_1.createRemoveMessage(messageId)),
    };
};
exports.Toaster = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Toaster_1.Toaster);
//# sourceMappingURL=Toaster.js.map