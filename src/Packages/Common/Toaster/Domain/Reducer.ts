import {
    ToasterEvent,
    ToasterEventTypes,
    ToasterState,
} from "Packages/Common/Toaster/Domain/Types";
import { Reducer } from "redux";

const initialToasterState: ToasterState = {
    messagesToAdd: [],
    toasts: [],
};

export const toasterReducer: Reducer<ToasterState, ToasterEvent> = function (
    state: ToasterState = initialToasterState,
    event?: ToasterEvent,
): ToasterState {
    if (!event) {
        return state;
    }

    if (event.type === ToasterEventTypes.MESSAGE_WAS_ADDED_TO_PIPELINE) {
        return {
            ...state,
            messagesToAdd: [...state.messagesToAdd, event.payload.messageToAdd],
        };
    }

    if (event.type === ToasterEventTypes.MESSAGES_WERE_ADDED_TO_TOAST) {
        const addedMessageIds = event.payload.messages.map((message) => message.id);
        const addedMessages = event.payload.messages.map((message) => ({
            ...message,
            isIntroAnimationRunning: true,
        }));
        return {
            ...state,
            messagesToAdd: state.messagesToAdd.filter(
                (messageToAdd) => !addedMessageIds.includes(messageToAdd.message.id),
            ),
            toasts: state.toasts.map((toast) => {
                if (toast.id !== event.payload.toastId) {
                    return toast;
                }
                return {
                    ...toast,
                    messages: [...addedMessages, ...toast.messages],
                };
            }),
        };
    }

    if (event.type === ToasterEventTypes.TOAST_WAS_ADDED) {
        const addedMessageIds = event.payload.toast.messages.map(
            (message) => message.id,
        );
        return {
            ...state,
            messagesToAdd: state.messagesToAdd.filter(
                (messageToAdd) => !addedMessageIds.includes(messageToAdd.message.id),
            ),
            toasts: [
                {
                    ...event.payload.toast,
                    messages: [
                        ...event.payload.toast.messages.map((message) => ({
                            ...message,
                            isIntroAnimationRunning: false,
                        })),
                    ],
                    isIntroAnimationRunning: true,
                },
                ...state.toasts,
            ],
        };
    }

    if (event.type === ToasterEventTypes.MESSAGE_INTRO_ANIMATIONS_WERE_FINISHED) {
        return {
            ...state,
            toasts: state.toasts.map((toast) => ({
                ...toast,
                messages: toast.messages.map((message) => {
                    if (event.payload.messageIds.includes(message.id)) {
                        return {
                            ...message,
                            isIntroAnimationRunning: false,
                        };
                    }
                    return message;
                }),
            })),
        };
    }

    if (event.type === ToasterEventTypes.TOAST_INTRO_ANIMATION_WAS_FINISHED) {
        return {
            ...state,
            toasts: state.toasts.map((toast) => {
                if (toast.id === event.payload.toastId) {
                    return {
                        ...toast,
                        isIntroAnimationRunning: false,
                    };
                }
                return toast;
            }),
        };
    }

    if (event.type === ToasterEventTypes.TOAST_OUTRO_ANIMATION_WAS_STARTED) {
        return {
            ...state,
            toasts: state.toasts.map((toast) => {
                if (toast.id === event.payload.toastId) {
                    return {
                        ...toast,
                        isOutroAnimationRunning: true,
                    };
                }
                return toast;
            }),
        };
    }

    if (event.type === ToasterEventTypes.MESSAGE_OUTRO_ANIMATION_WAS_STARTED) {
        return {
            ...state,
            toasts: state.toasts.map((toast) => ({
                ...toast,
                messages: toast.messages.map((message) => {
                    if (event.payload.messageId === message.id) {
                        return {
                            ...message,
                            isOutroAnimationRunning: true,
                        };
                    }
                    return message;
                }),
            })),
        };
    }

    if (event.type === ToasterEventTypes.TOAST_WAS_REMOVED) {
        return {
            ...state,
            toasts: state.toasts.filter(
                (toast) => toast.id !== event.payload.toastId,
            ),
        };
    }

    if (event.type === ToasterEventTypes.MESSAGE_WAS_REMOVED) {
        return {
            ...state,
            toasts: state.toasts.map((toast) => ({
                ...toast,
                messages: toast.messages.filter(
                    (message) => message.id !== event.payload.messageId,
                ),
            })),
        };
    }

    return state;
};
