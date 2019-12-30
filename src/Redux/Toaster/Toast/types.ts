import {Message} from "App/Redux/Toaster/Message/types";

export const INFO_TOAST_TYPE = 'info';
export const SUCCESS_TOAST_TYPE = 'success';
export const ERROR_TOAST_TYPE = 'error';

export enum ToastTypes {
    INFO = 'info',
    SUCCESS = 'success',
    ERROR = 'error',
}

export enum ToastActionTypes {
    ADD_TOAST = 'ADD_TOAST-8266728a-7572-48cb-9ff4-2e27071e1343',
    BEGIN_SHOW_TOAST_ANIMATION = 'BEGIN_SHOW_TOAST_ANIMATION-8266728a-7572-48cb-9ff4-2e27071e1343',
    END_SHOW_TOAST_ANIMATION = 'END_SHOW_TOAST_ANIMATION-8266728a-7572-48cb-9ff4-2e27071e1343',
}

export type Toast = {
    id: string,
    type: ToastTypes,
    messages: Message[],
    isVisible: boolean,
    isAnimationRunning: boolean,
};

export type AddToast = {
    type: ToastActionTypes.ADD_TOAST,
    payload: {
        toast: Toast,
    }
};

export type BeginShowToastAnimation = {
    type: ToastActionTypes.BEGIN_SHOW_TOAST_ANIMATION,
    payload: {
        toastId: string,
    }
};

export type EndShowToastAnimation = {
    type: ToastActionTypes.END_SHOW_TOAST_ANIMATION,
    payload: {
        toastId: string,
    }
};

export type ToastActions = (AddToast | BeginShowToastAnimation | EndShowToastAnimation);