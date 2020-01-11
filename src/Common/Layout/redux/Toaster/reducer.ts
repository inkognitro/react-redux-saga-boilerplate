import {Message, MessageToAdd, Toast, ToasterActions, ToasterActionTypes, ToasterState, ToastTypes} from "./types";
import {v4 as uuidV4} from "uuid";

function createInitialToastState(): Toast {
    return {
        id: uuidV4(),
        type: ToastTypes.INFO,
        messages: [],
        canReceiveMessages: true,
    };
}

function toastReducer(state: Toast = createInitialToastState(), action?: ToasterActions): Toast {
    if(!action) {
        return state;
    }

    if(action.type === ToasterActionTypes.REMOVE_TOAST_MESSAGE) {
        const toastId = action.payload.toastId;
        if(toastId !== state.id) {
            return state;
        }
        const messageId = action.payload.toastMessageId;
        return Object.assign({}, state, {
            messages: state.messages.filter((message) => (message.id !== messageId)),
        });
    }

    if(action.type === ToasterActionTypes.BLOCK_TOAST_FOR_MESSAGE_RECEIVING) {
        const toastId = action.payload.toastId;
        if(toastId !== state.id) {
            return state;
        }
        return Object.assign({}, state, {
            canReceiveMessages: false,
        });
    }

    return state;
}

const initialToasterState: ToasterState = {
    messagesToAdd: [],
    toasts: []
};

export function toaster (state: ToasterState = initialToasterState, action?: ToasterActions): ToasterState {
    if(!action) {
        return state;
    }

    if(action.type === ToasterActionTypes.ADD_MESSAGE_TO_PIPELINE) {
        return Object.assign({}, state, {
            messagesToAdd: [
                action.payload.messageToAdd,
                ...state.messagesToAdd,
            ]
        });
    }

    if(action.type === ToasterActionTypes.MOVE_MESSAGES_FROM_PIPELINE_TO_TOAST) {
        const toastId = action.payload.toastId;
        const enableMessageIntroAnimation = action.payload.enableMessageIntroAnimation;
        const toast = findOrCreateNullableToastForMessagesToAdd(state, toastId);
        if(!toast) {
            return state;
        }
        const newToast = Object.assign({}, toast, {
            messages: [
                ...createAdditionalMessages(state, toastId, enableMessageIntroAnimation),
                ...toast.messages,
            ]
        });
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

    if(action.type === ToasterActionTypes.BLOCK_TOAST_FOR_MESSAGE_RECEIVING) {
        return Object.assign({}, state, {
            toasts: state.toasts.map((toast) => toastReducer(toast, action))
        });
    }

    if(action.type === ToasterActionTypes.REMOVE_TOAST_MESSAGE) {
        return Object.assign({}, state, {
            toasts: state.toasts.map((toast) => toastReducer(toast, action))
        });
    }

    if(action.type === ToasterActionTypes.REMOVE_TOAST) {
        const toastId = action.payload.toastId;
        return Object.assign({}, state, {
            toasts: state.toasts.filter((storedToast) => (storedToast.id !== toastId))
        });
    }

    return state;
}

function findOrCreateNullableToastForMessagesToAdd(toaster: ToasterState, toastId: string): (null | Toast) {
    const toast = toaster.toasts.find((toast) => (toast.id === toastId));
    if(toast) {
        return toast;
    }
    const firstMessageToAdd = toaster.messagesToAdd.slice().reverse().find(
        (messageToAdd) => (messageToAdd.id = toastId)
    );
    if(!firstMessageToAdd) {
        return null;
    }
    return Object.assign({}, createInitialToastState(), {
        id: toastId,
        type: firstMessageToAdd.type,
    });
}

function createAdditionalMessages(
    state: ToasterState,
    toastId: string,
    enableMessageIntroAnimation: boolean
): Message[] {
    const messagesToAdd = state.messagesToAdd.filter((messageToAdd) => (messageToAdd.toastId === toastId));
    return messagesToAdd.map((messagesToAdd: MessageToAdd): Message => ({
        id: messagesToAdd.id,
        content: messagesToAdd.content,
        isIntroAnimationEnabled: enableMessageIntroAnimation,
    }));
}