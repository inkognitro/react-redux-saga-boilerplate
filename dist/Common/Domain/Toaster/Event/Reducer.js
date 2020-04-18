"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/Toaster/Types");
const initialToasterState = {
    messagesToAdd: [],
    toasts: [],
};
exports.toasterReducer = function (state = initialToasterState, event) {
    if (!event) {
        return state;
    }
    if (event.type === Types_1.ToasterEventTypes.MESSAGE_WAS_ADDED_TO_PIPELINE) {
        return Object.assign(Object.assign({}, state), { messagesToAdd: [
                ...state.messagesToAdd,
                event.payload.messageToAdd
            ] });
    }
    if (event.type === Types_1.ToasterEventTypes.MESSAGES_WERE_ADDED_TO_TOAST) {
        const addedMessageIds = event.payload.messages.map((message) => (message.id));
        const addedMessages = event.payload.messages.map((message) => (Object.assign(Object.assign({}, message), { isIntroAnimationRunning: true })));
        return Object.assign(Object.assign({}, state), { messagesToAdd: state.messagesToAdd.filter((messageToAdd) => (!addedMessageIds.includes(messageToAdd.message.id))), toasts: state.toasts.map((toast) => {
                if (toast.id !== event.payload.toastId) {
                    return toast;
                }
                return Object.assign(Object.assign({}, toast), { messages: [
                        ...addedMessages,
                        ...toast.messages,
                    ] });
            }) });
    }
    if (event.type === Types_1.ToasterEventTypes.TOAST_WAS_ADDED) {
        const addedMessageIds = event.payload.toast.messages.map((message) => (message.id));
        return Object.assign(Object.assign({}, state), { messagesToAdd: state.messagesToAdd.filter((messageToAdd) => (!addedMessageIds.includes(messageToAdd.message.id))), toasts: [
                Object.assign(Object.assign({}, event.payload.toast), { messages: [
                        ...event.payload.toast.messages.map((message) => (Object.assign(Object.assign({}, message), { isIntroAnimationRunning: false })))
                    ], isIntroAnimationRunning: true }),
                ...state.toasts,
            ] });
    }
    if (event.type === Types_1.ToasterEventTypes.MESSAGE_INTRO_ANIMATIONS_WERE_FINISHED) {
        return Object.assign(Object.assign({}, state), { toasts: state.toasts.map((toast) => (Object.assign(Object.assign({}, toast), { messages: toast.messages.map((message) => {
                    if (event.payload.messageIds.includes(message.id)) {
                        return Object.assign(Object.assign({}, message), { isIntroAnimationRunning: false });
                    }
                    return message;
                }) }))) });
    }
    if (event.type === Types_1.ToasterEventTypes.TOAST_INTRO_ANIMATION_WAS_FINISHED) {
        return Object.assign(Object.assign({}, state), { toasts: state.toasts.map((toast) => {
                if (toast.id === event.payload.toastId) {
                    return Object.assign(Object.assign({}, toast), { isIntroAnimationRunning: false });
                }
                return toast;
            }) });
    }
    if (event.type === Types_1.ToasterEventTypes.TOAST_OUTRO_ANIMATION_WAS_STARTED) {
        return Object.assign(Object.assign({}, state), { toasts: state.toasts.map((toast) => {
                if (toast.id === event.payload.toastId) {
                    return Object.assign(Object.assign({}, toast), { isOutroAnimationRunning: true });
                }
                return toast;
            }) });
    }
    if (event.type === Types_1.ToasterEventTypes.MESSAGE_OUTRO_ANIMATION_WAS_STARTED) {
        return Object.assign(Object.assign({}, state), { toasts: state.toasts.map((toast) => (Object.assign(Object.assign({}, toast), { messages: toast.messages.map((message) => {
                    if (event.payload.messageId === message.id) {
                        return Object.assign(Object.assign({}, message), { isOutroAnimationRunning: true });
                    }
                    return message;
                }) }))) });
    }
    if (event.type === Types_1.ToasterEventTypes.TOAST_WAS_REMOVED) {
        return Object.assign(Object.assign({}, state), { toasts: state.toasts.filter((toast) => (toast.id !== event.payload.toastId)) });
    }
    if (event.type === Types_1.ToasterEventTypes.MESSAGE_WAS_REMOVED) {
        return Object.assign(Object.assign({}, state), { toasts: state.toasts.map((toast) => (Object.assign(Object.assign({}, toast), { messages: toast.messages.filter((message) => (message.id !== event.payload.messageId)) }))) });
    }
    return state;
};
//# sourceMappingURL=Reducer.js.map