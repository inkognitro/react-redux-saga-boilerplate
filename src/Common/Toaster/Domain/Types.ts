import {MessageWasAddedToPipeline} from "Common/Toaster/Domain/Event/MessageWasAddedToPipeline";
import {MessageWasMovedFromPipelineToToast} from "Common/Toaster/Domain/Event/MessageWasMovedFromPipelineToToast";
import {ToastWasBlockedForMessageReceiving} from "Common/Toaster/Domain/Event/ToastWasBlockedForMessageReceiving";
import {ToastMessageWasRemoved} from "Common/Toaster/Domain/Event/ToastMessageWasRemoved";
import {ToastWasRemoved} from "Common/Toaster/Domain/Event/ToastWasRemoved";

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

export enum ToasterEventTypes {
    MESSAGE_WAS_ADDED_TO_PIPELINE = 'ADD_MESSAGE_TO_PIPELINE-8266728a-7572-48cb-9ff4-2e27071e1343',
    MOVE_MESSAGES_FROM_PIPELINE_TO_TOAST = 'MOVE_MESSAGES_FROM_PIPELINE_TO_TOAST-8266728a-7572-48cb-9ff4-2e27071e1343',
    TOAST_WAS_BLOCKED_FOR_MESSAGE_RECEIVING = 'BLOCK_TOAST_FOR_MESSAGE_RECEIVING-8266728a-7572-48cb-9ff4-2e27071e1343',
    REMOVE_TOAST = 'REMOVE_TOAST-8266728a-7572-48cb-9ff4-2e27071e1343',
    REMOVE_TOAST_MESSAGE = 'REMOVE_TOAST_MESSAGE-8266728a-7572-48cb-9ff4-2e27071e1343',
}

export type ToasterEvent = (
    MessageWasAddedToPipeline
    | MessageWasMovedFromPipelineToToast
    | ToastWasBlockedForMessageReceiving
    | ToastMessageWasRemoved
    | ToastWasRemoved
);

export type ToasterState = {
    messagesToAdd: MessageToAdd[],
    toasts: Toast[],
};