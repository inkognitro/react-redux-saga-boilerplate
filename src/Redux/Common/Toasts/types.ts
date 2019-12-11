export const ACTION_SUFFIX = '8266728a-7572-48cb-9ff4-2e27071e1343';
export const ADD_TOAST_MESSAGE_ACTION_TYPE = 'ADD_TOAST_MESSAGE_' + ACTION_SUFFIX;
export const REMOVE_TOAST_MESSAGE_ACTION_TYPE = 'REMOVE_TOAST_MESSAGE_' + ACTION_SUFFIX;

export interface ToastsState {
    messages: []
}

export interface Message {
    id: string,
    type: 'info' | 'success' | 'error',
    message: string,
    groupId?: string,
}

export interface AddToastMessageAction {
    type: typeof ADD_TOAST_MESSAGE_ACTION_TYPE
    payload: {
        message: Message,
    }
}

export interface RemoveToastMessageAction {
    type: typeof REMOVE_TOAST_MESSAGE_ACTION_TYPE
    payload: {
        message: Message,
    }
}