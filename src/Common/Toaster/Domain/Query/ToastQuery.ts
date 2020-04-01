import {Toast, ToasterState} from "Common/Toaster/Domain/Types";

export function getAllToasts(state: ToasterState): Toast[] {
    return state.toasts;
}

export function findToastById(state: ToasterState, toastId: string): (null | Toast) {
    const foundToast = state.toasts.find((toast) => (toast.id === toastId));
    if (foundToast) {
        return foundToast;
    }
    return null;
}

export function findToastByMessageId(state: ToasterState, messageId: string): (null | Toast) {
    for (let index in state.toasts) {
        const toast = state.toasts[index];
        const foundMessage = toast.messages.find((message) => (message.id === messageId));
        if (foundMessage) {
            return toast;
        }
    }
    return null;
}