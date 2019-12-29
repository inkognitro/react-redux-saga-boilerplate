import {Message} from "App/Redux/Toaster/Message/types";

const ACTION_SUFFIX = '8266728a-7572-48cb-9ff4-2e27071e1343';

export const INFO_TOAST_TYPE = 'info';
export const SUCCESS_TOAST_TYPE = 'success';
export const ERROR_TOAST_TYPE = 'error';

export type toastType = (INFO_TOAST_TYPE | SUCCESS_TOAST_TYPE | ERROR_TOAST_TYPE);
export type Toast = {
    id: string,
    type: toastType,
    messages: Message[],
    isVisible: boolean,
    isAnimationRunning: boolean,
};

export const ADD_TOAST = 'ADD_TOAST' + ACTION_SUFFIX;
export type AddToast = {
    type: typeof ADD_TOAST,
    payload: {
        toast: Toast,
    }
};

export const BEGIN_SHOW_TOAST_ANIMATION = 'BEGIN_SHOW_TOAST_ANIMATION' + ACTION_SUFFIX;
export type BeginShowToastAnimation = {
    type: typeof BEGIN_SHOW_TOAST_ANIMATION,
    payload: {
        toastId: string,
    }
};

export const END_SHOW_TOAST_ANIMATION = 'END_SHOW_TOAST_ANIMATION' + ACTION_SUFFIX;
export type EndShowToastAnimation = {
    type: typeof END_SHOW_TOAST_ANIMATION,
    payload: {
        toastId: string,
    }
};

export type ToastActionType = (AddToast | BeginShowToastAnimation | EndShowToastAnimation);