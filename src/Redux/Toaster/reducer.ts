import {Message, MessageToAdd, ToasterActions, ToasterActionTypes, ToasterState} from "./types";

const initialToasterState: ToasterState = {
    messagesToAdd: [],
    toasts: []
};

export function toaster (state: ToasterState = initialToasterState, action?: ToasterActions): ToasterState {
    console.log(action);

    if(!action) {
        return state;
    }

    if(action.type === ToasterActionTypes.ADD_TOAST) {
        return Object.assign({}, state, {
            toasts: [
                action.payload.toast,
                ...state.toasts,
            ]
        });
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
        const areMessageIntroAnimationsEnabled = action.payload.areMessageIntroAnimationsEnabled;
        return Object.assign({}, state, {
            messagesToAdd: state.messagesToAdd.filter(
                (messageToAdd) => (messageToAdd.toastId !== toastId)
            ),
            toasts: state.toasts.map((storedToast) => {
                if(storedToast.id === toastId) {
                    const messagesToAdd = state.messagesToAdd.filter(
                        (messageToAdd) => (messageToAdd.toastId === toastId)
                    );
                    const messages = createMessages(messagesToAdd, areMessageIntroAnimationsEnabled);
                    return Object.assign({}, storedToast, {
                        messages: [
                            ...messages,
                            ...storedToast.messages,
                        ]
                    });
                }
                return storedToast;
            })
        });
    }

    if(action.type === ToasterActionTypes.BLOCK_TOAST_FOR_MESSAGE_RECEIVING) {
        const toastId = action.payload.toastId;
        return Object.assign({}, state, {
            toasts: state.toasts.map((storedToast) => {
                if(storedToast.id === toastId) {
                    return Object.assign({}, storedToast, {
                        canReceiveMessages: false,
                    });
                }
                return storedToast;
            })
        });
    }

    if(action.type === ToasterActionTypes.REMOVE_TOAST_MESSAGE) {
        const toastId = action.payload.toastId;
        const messageId = action.payload.toastMessageId;
        return Object.assign({}, state, {
            toasts: state.toasts.map((storedToast) => {
                if(storedToast.id === toastId) {
                    return Object.assign({}, storedToast, {
                        messages: storedToast.messages.filter((message) => (message.id !== messageId)),
                    });
                }
                return storedToast;
            })
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

function createMessages(messagesToAdd: MessageToAdd[], areMessageIntroAnimationsEnabled: boolean): Message[] {
    return messagesToAdd.map((messagesToAdd: MessageToAdd): Message => ({
        id: messagesToAdd.id,
        content: messagesToAdd.content,
        isIntroAnimationEnabled: areMessageIntroAnimationsEnabled,
    }));
}