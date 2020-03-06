import {v4 as uuidV4} from "uuid";
import {
    Message,
    MessageToAdd,
    Toast,
    ToasterEvents,
    ToasterEventTypes,
    ToasterState, ToastTypes
} from "Common/Toaster/Domain/Types";

const initialToasterState: ToasterState = {
    messagesToAdd: [],
    toasts: []
};

export function toaster(state: ToasterState = initialToasterState, action?: ToasterEvents): ToasterState {
    if (!action) {
        return state;
    }

    if (action.type === ToasterEventTypes.MESSAGE_WAS_ADDED_TO_PIPELINE) {
        return Object.assign({}, state, {
            messagesToAdd: [
                action.payload.messageToAdd,
                ...state.messagesToAdd,
            ]
        });
    }

    if (action.type === ToasterEventTypes.MOVE_MESSAGES_FROM_PIPELINE_TO_TOAST) {
        const toastId = action.payload.toastId;
        const newToast = findUpdatedOrCreatedToastWithAddedMessages(state, toastId);
        if (!newToast) {
            return state;
        }
        const doesToastAlreadyExist = (state.toasts.findIndex((toast) => (toast.id === toastId)) !== -1);
        let toastsToAdd = (doesToastAlreadyExist ? [] : [newToast]);
        return Object.assign({}, state, {
            messagesToAdd: state.messagesToAdd.filter((messageToAdd) => (messageToAdd.toastId !== toastId)),
            toasts: [
                ...toastsToAdd,
                ...state.toasts.map((toast) => ((toast.id === toastId) ? newToast : toast)),
            ],
        });
    }

    if (action.type === ToasterEventTypes.TOAST_WAS_BLOCKED_FOR_MESSAGE_RECEIVING) {
        return Object.assign({}, state, {
            toasts: state.toasts.map((toast) => toastReducer(toast, action))
        });
    }

    if (action.type === ToasterEventTypes.REMOVE_TOAST_MESSAGE) {
        return Object.assign({}, state, {
            toasts: state.toasts.map((toast) => toastReducer(toast, action))
        });
    }

    if (action.type === ToasterEventTypes.REMOVE_TOAST) {
        const toastId = action.payload.toastId;
        return Object.assign({}, state, {
            toasts: state.toasts.filter((storedToast) => (storedToast.id !== toastId))
        });
    }

    return state;
}

function createInitialToastState(): Toast {
    return {
        id: uuidV4(),
        type: ToastTypes.INFO,
        messages: [],
        canReceiveMessages: true,
    };
}

function toastReducer(state: Toast = createInitialToastState(), action?: ToasterEvents): Toast {
    if (!action) {
        return state;
    }

    if (action.type === ToasterEventTypes.REMOVE_TOAST_MESSAGE) {
        const toastId = action.payload.toastId;
        if (toastId !== state.id) {
            return state;
        }
        const messageId = action.payload.toastMessageId;
        return Object.assign({}, state, {
            messages: state.messages.filter((message) => (message.id !== messageId)),
        });
    }

    if (action.type === ToasterEventTypes.TOAST_WAS_BLOCKED_FOR_MESSAGE_RECEIVING) {
        const toastId = action.payload.toastId;
        if (toastId !== state.id) {
            return state;
        }
        return Object.assign({}, state, {
            canReceiveMessages: false,
        });
    }

    return state;
}

function findUpdatedOrCreatedToastWithAddedMessages(toasterState: ToasterState, toastId: string): (null | Toast) {
    const storedToast = toasterState.toasts.find((toast) => (toast.id === toastId));
    if (storedToast && !storedToast.canReceiveMessages) {
        return null;
    }
    const messagesToAdd = toasterState.messagesToAdd.filter((messageToAdd) => (messageToAdd.toastId === toastId));
    if (messagesToAdd.length === 0) {
        return null;
    }
    if(storedToast) {
        return Object.assign({}, storedToast, {
            messages: [
                ...createAdditionalMessages(messagesToAdd, true),
                ...storedToast.messages
            ]
        });
    }
    return Object.assign(createInitialToastState(), {
        id: toastId,
        type: messagesToAdd[0].type,
        messages: createAdditionalMessages(messagesToAdd, false)
    });
}

function createAdditionalMessages(messagesToAdd: MessageToAdd[], enableMessageIntroAnimation: boolean): Message[] {
    return messagesToAdd.map((messagesToAdd: MessageToAdd): Message => ({
        id: messagesToAdd.id,
        content: messagesToAdd.content,
        isIntroAnimationEnabled: enableMessageIntroAnimation,
    }));
}