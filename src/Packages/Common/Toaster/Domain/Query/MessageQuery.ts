import {
    Message,
    MessageToAdd,
    ToasterState,
} from "../Types";

export function findMessageToAddByMessageId(
    state: ToasterState,
    messageId: string,
): null | MessageToAdd {
    const foundMessage = state.messagesToAdd.find(
        (messageToAdd) => messageToAdd.message.id === messageId,
    );
    if (foundMessage) {
        return foundMessage;
    }
    return null;
}

export function getNonRemovingMessagesInToast(
    state: ToasterState,
    toastId: string,
): Message[] {
    const toast = state.toasts.find((toast) => toast.id === toastId);
    if (!toast) {
        return [];
    }
    return toast.messages.filter((message) => !message.isOutroAnimationRunning);
}
