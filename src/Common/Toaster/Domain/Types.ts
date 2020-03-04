import {AddMessageToPipelineAction} from "Common/Toaster/Domain/Actions/AddMessageToPipelineAction";
import {MoveMessagesFromPipelineToToastAction} from "Common/Toaster/Domain/Actions/MoveMessagesFromPipelineToToastAction";
import {BlockToastForMessageReceivingAction} from "Common/Toaster/Domain/Actions/BlockToastForMessageReceivingAction";
import {RemoveToastMessageAction} from "Common/Toaster/Domain/Actions/RemoveToastMessageAction";
import {RemoveToastAction} from "Common/Toaster/Domain/Actions/RemoveToastAction";

export enum ToastTypes {
    INFO = 'info',
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error',
}

export type MessageToAdd = {
    id: string,
    toastId: string,
    type: ToastTypes,
    content: string,
};

export type Message = {
    id: string,
    content: string,
    isIntroAnimationEnabled: boolean,
};

export type Toast = {
    id: string,
    type: ToastTypes,
    messages: Message[],
    canReceiveMessages: boolean,
};

export enum ToasterActionTypes {
    ADD_MESSAGE_TO_PIPELINE = 'ADD_MESSAGE_TO_PIPELINE-8266728a-7572-48cb-9ff4-2e27071e1343',
    MOVE_MESSAGES_FROM_PIPELINE_TO_TOAST = 'MOVE_MESSAGES_FROM_PIPELINE_TO_TOAST-8266728a-7572-48cb-9ff4-2e27071e1343',
    BLOCK_TOAST_FOR_MESSAGE_RECEIVING = 'BLOCK_TOAST_FOR_MESSAGE_RECEIVING-8266728a-7572-48cb-9ff4-2e27071e1343',
    REMOVE_TOAST = 'REMOVE_TOAST-8266728a-7572-48cb-9ff4-2e27071e1343',
    REMOVE_TOAST_MESSAGE = 'REMOVE_TOAST_MESSAGE-8266728a-7572-48cb-9ff4-2e27071e1343',
}

export type ToasterActions = (
    AddMessageToPipelineAction
    | MoveMessagesFromPipelineToToastAction
    | BlockToastForMessageReceivingAction
    | RemoveToastMessageAction
    | RemoveToastAction
);

export type ToasterState = {
    messagesToAdd: MessageToAdd[],
    toasts: Toast[],
};