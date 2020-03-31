import {MessageWasAddedToPipeline} from "Common/ToasterOld/Domain/Event/MessageWasAddedToPipeline";
import {MessagesWereMovedFromPipelineToToasts} from "Common/ToasterOld/Domain/Event/MessagesWereMovedFromPipelineToToasts";
import {ToastWasBlockedForMessageReceiving} from "Common/ToasterOld/Domain/Event/ToastWasBlockedForMessageReceiving";
import {ToastMessageWasRemoved} from "Common/ToasterOld/Domain/Event/ToastMessageWasRemoved";
import {ToastWasRemoved} from "Common/ToasterOld/Domain/Event/ToastWasRemoved";

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
    isBeingRemoved: boolean,
};

export type Toast = {
    id: string,
    type: ToastTypes,
    messages: Message[],
    canReceiveMessages: boolean,
};

export enum ToasterEventTypes {
    MESSAGE_WAS_ADDED_TO_PIPELINE = 'MESSAGE_WAS_ADDED_TO_PIPELINE-8266728a-7572-48cb-9ff4-2e27071e1343',
    MESSAGES_WERE_MOVED_FROM_PIPELINE_TO_TOAST = 'MESSAGES_WERE_MOVED_FROM_PIPELINE_TO_TOAST-8266728a-7572-48cb-9ff4-2e27071e1343',
    TOAST_WAS_BLOCKED_FOR_MESSAGE_RECEIVING = 'BLOCK_TOAST_FOR_MESSAGE_RECEIVING-8266728a-7572-48cb-9ff4-2e27071e1343',
    TOAST_WAS_REMOVED = 'TOAST_WAS_REMOVED-8266728a-7572-48cb-9ff4-2e27071e1343',
    TOAST_MESSAGE_WAS_REMOVED = 'TOAST_MESSAGE_WAS_REMOVED-8266728a-7572-48cb-9ff4-2e27071e1343',
    TOAST_MESSAGE_REMOVAL_WAS_STARTED = 'TOAST_MESSAGE_REMOVAL_WAS_STARTED-8266728a-7572-48cb-9ff4-2e27071e1343',
}

export type ToasterEvent = (
    MessageWasAddedToPipeline
    | MessagesWereMovedFromPipelineToToasts
    | ToastWasBlockedForMessageReceiving
    | ToastMessageWasRemoved
    | ToastWasRemoved
);

export type ToasterState = {
    messagesToAdd: MessageToAdd[],
    toasts: Toast[],
};