import {Message} from "Common/Toaster/Domain/Types";

export enum ToastTypes {
    INFO = 'info',
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error',
}

export type Toast = {
    id: string,
    type: ToastTypes,
    messages: Message[],
    canReceiveMessages: boolean,
};

export type AddToastMessageSettings = {
    type: ToastTypes,
    content: string,
};

export default interface ToastRepository {
    getCommonToastIdByType(type: ToastTypes): string,
    findAll(): Toast[],
    addToastMessage(settings: AddToastMessageSettings): void,
    removeToast(toastId: string): void,
    blockToastForMessageReceiving(toastId: string): void,
    removeToastMessage(toastId: string, toastMessageId: string): void,
}