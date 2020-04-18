"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function findMessageById(state, messageId) {
    for (let index in state.toasts) {
        const toast = state.toasts[index];
        const foundMessage = toast.messages.find((message) => (message.id === messageId));
        if (foundMessage) {
            return foundMessage;
        }
    }
    return null;
}
exports.findMessageById = findMessageById;
function findMessageToAddByMessageId(state, messageId) {
    const foundMessage = state.messagesToAdd.find((messageToAdd) => (messageToAdd.message.id === messageId));
    if (foundMessage) {
        return foundMessage;
    }
    return null;
}
exports.findMessageToAddByMessageId = findMessageToAddByMessageId;
function getNonRemovingMessagesInToast(state, toastId) {
    const toast = state.toasts.find((toast) => (toast.id === toastId));
    if (!toast) {
        return [];
    }
    return toast.messages.filter((message) => (!message.isOutroAnimationRunning));
}
exports.getNonRemovingMessagesInToast = getNonRemovingMessagesInToast;
//# sourceMappingURL=MessageQuery.js.map