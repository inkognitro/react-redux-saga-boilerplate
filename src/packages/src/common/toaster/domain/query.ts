import { MessageTypes } from "packages/common/types/util/domain";
import {
    Message, MessageToAdd, Toast, ToasterState, ToastTypes,
} from "./types";

export enum CommonToastIds {
    INFO = "5011d2e7-ce60-4186-bbee-bf3e8ab57c3b",
    SUCCESS = "fb02626d-b3f7-4589-b880-ae468d763f7f",
    WARNING = "9210671f-37da-4258-90e5-dc6faf6ba87a",
    ERROR = "3fd1b7de-cf2e-49ba-bda3-fcde9e0632bd",
}

export function getCommonToastIdByType(type: ToastTypes): string {
    if (type === ToastTypes.INFO) {
        return CommonToastIds.INFO;
    }
    if (type === ToastTypes.SUCCESS) {
        return CommonToastIds.SUCCESS;
    }
    if (type === ToastTypes.WARNING) {
        return CommonToastIds.WARNING;
    }
    if (type === ToastTypes.ERROR) {
        return CommonToastIds.ERROR;
    }
    throw new Error(`toast type "${type}" not supported`);
}

export function findMessageToAddByMessageId(state: ToasterState, messageId: string): (null | MessageToAdd) {
    const foundMessage = state.messagesToAdd.find(
        (messageToAdd) => messageToAdd.message.id === messageId,
    );
    if (foundMessage) {
        return foundMessage;
    }
    return null;
}

export function getNonRemovingMessagesInToast(state: ToasterState, toastId: string): Message[] {
    const toast = state.toasts.find((toast) => toast.id === toastId);
    if (!toast) {
        return [];
    }
    return toast.messages.filter((message) => !message.isOutroAnimationRunning);
}

export function getAllToasts(state: ToasterState): Toast[] {
    return state.toasts;
}

export function findToastById(
    state: ToasterState,
    toastId: string,
): null | Toast {
    const foundToast = state.toasts.find((toast) => toast.id === toastId);
    if (foundToast) {
        return foundToast;
    }
    return null;
}

export function findToastByMessageId(state: ToasterState, messageId: string): (null | Toast) {
    for (const index in state.toasts) {
        const toast = state.toasts[index];
        const foundMessage = toast.messages.find(
            (message) => message.id === messageId,
        );
        if (foundMessage) {
            return toast;
        }
    }
    return null;
}

export function getToastTypeByMessageType(messageType: MessageTypes) {
    if (messageType === MessageTypes.ERROR) {
        return ToastTypes.ERROR;
    }
    if (messageType === MessageTypes.SUCCESS) {
        return ToastTypes.SUCCESS;
    }
    if (messageType === MessageTypes.WARNING) {
        return ToastTypes.WARNING;
    }
    return ToastTypes.INFO;
}
