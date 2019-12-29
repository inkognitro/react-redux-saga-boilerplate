import {Toast, ToastActionType} from "App/Redux/Toaster/Toast/types";
import {Message} from "App/Redux/Toaster/Message/types";

export type ToasterState = {
    toastMessagesToAdd: MessageToAdd[],
    toasts: Toast[],
};

export type MessageToAdd = {
    toastId: string,
    message: Message,
};

export type ToasterActionType = (ToastActionType);