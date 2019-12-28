type toastType = 'info' | 'success' | 'error';
type toastAnimation = 'fadeIn' | 'fadeOut';

type messageType = 'info' | 'success' | 'error';
type messageAnimation = 'slideIn' | 'slideOut';

export interface ToasterState {
    messagesInPipeline: Message[],
    toasts: Toast[]
}

export interface Toast {
    id: string,
    type: toastType,
    messages: Message[],
    runningAnimation?: toastAnimation,
}

export interface Message {
    id: string,
    type: messageType,
    message: string,
    runningAnimation?: messageAnimation,
    toastId: string,
}

const ACTION_SUFFIX = '8266728a-7572-48cb-9ff4-2e27071e1343';

export const ADD_TOAST_MESSAGE_TO_PIPELINE = 'ADD_TOAST_MESSAGE_TO_PIPELINE' + ACTION_SUFFIX;
interface AddMessageToPipelineAction {
    type: typeof ADD_TOAST_MESSAGE_TO_PIPELINE,
    payload: {
        message: Message,
    }
}

export const ADD_MESSAGE_TO_TOAST = 'ADD_MESSAGE_TO_TOAST' + ACTION_SUFFIX;
interface AddMessageToToastAction {
    type: typeof ADD_MESSAGE_TO_TOAST,
    payload: {
        message: Message,
    }
}

export type ToasterActionType = (AddMessageToPipelineAction | AddMessageToToastAction);