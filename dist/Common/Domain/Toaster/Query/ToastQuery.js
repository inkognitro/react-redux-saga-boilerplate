"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getAllToasts(state) {
    return state.toasts;
}
exports.getAllToasts = getAllToasts;
function findToastById(state, toastId) {
    const foundToast = state.toasts.find((toast) => (toast.id === toastId));
    if (foundToast) {
        return foundToast;
    }
    return null;
}
exports.findToastById = findToastById;
function findToastByMessageId(state, messageId) {
    for (let index in state.toasts) {
        const toast = state.toasts[index];
        const foundMessage = toast.messages.find((message) => (message.id === messageId));
        if (foundMessage) {
            return toast;
        }
    }
    return null;
}
exports.findToastByMessageId = findToastByMessageId;
//# sourceMappingURL=ToastQuery.js.map