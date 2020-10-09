import { Event } from "packages/common/types/util/domain";
import { Message, MessageToAdd, Toast } from "./types";

export enum ToasterEventTypes {
    MESSAGE_INTRO_ANIMATIONS_WERE_FINISHED = "MESSAGE_INTRO_ANIMATIONS_WERE_FINISHED-8266728a-7572-48cb-9ff4-2e27071e1343",
    MESSAGE_OUTRO_ANIMATION_WAS_STARTED = "MESSAGE_OUTRO_ANIMATION_WAS_STARTED-8266728a-7572-48cb-9ff4-2e27071e1343",
    MESSAGES_WERE_ADDED_TO_TOAST = "MESSAGES_WERE_ADDED_TO_TOAST-8266728a-7572-48cb-9ff4-2e27071e1343",
    MESSAGE_WAS_ADDED_TO_PIPELINE = "MESSAGE_WAS_ADDED_TO_PIPELINE-8266728a-7572-48cb-9ff4-2e27071e1343",
    MESSAGE_WAS_REMOVED = "MESSAGE_WAS_REMOVED-8266728a-7572-48cb-9ff4-2e27071e1343",
    TOAST_INTRO_ANIMATION_WAS_FINISHED = "TOAST_INTRO_ANIMATION_WAS_FINISHED-8266728a-7572-48cb-9ff4-2e27071e1343",
    TOAST_OUTRO_ANIMATION_WAS_STARTED = "TOAST_OUTRO_ANIMATION_WAS_STARTED-8266728a-7572-48cb-9ff4-2e27071e1343",
    TOAST_WAS_ADDED = "TOAST_WAS_ADDED-8266728a-7572-48cb-9ff4-2e27071e1343",
    TOAST_WAS_REMOVED = "TOAST_WAS_REMOVED-8266728a-7572-48cb-9ff4-2e27071e1343",
}

export function createMessageIntroAnimationsWereFinished(
    messageIds: string[],
): MessageIntroAnimationsWereFinished {
    return {
        type: ToasterEventTypes.MESSAGE_INTRO_ANIMATIONS_WERE_FINISHED,
        payload: {
            messageIds,
        },
    };
}

export type MessageIntroAnimationsWereFinished = Event<ToasterEventTypes.MESSAGE_INTRO_ANIMATIONS_WERE_FINISHED, {
    messageIds: string[];
}>;

export function createMessageOutroAnimationWasStarted(
    messageId: string,
): MessageOutroAnimationWasStarted {
    return {
        type: ToasterEventTypes.MESSAGE_OUTRO_ANIMATION_WAS_STARTED,
        payload: {
            messageId,
        },
    };
}

export type MessageOutroAnimationWasStarted = Event<ToasterEventTypes.MESSAGE_OUTRO_ANIMATION_WAS_STARTED, {
    messageId: string;
}>;

export function createMessagesWereAddedToToast(
    toastId: string,
    messages: Message[],
): MessagesWereAddedToToast {
    return {
        type: ToasterEventTypes.MESSAGES_WERE_ADDED_TO_TOAST,
        payload: {
            toastId,
            messages,
        },
    };
}

export type MessagesWereAddedToToast = Event<ToasterEventTypes.MESSAGES_WERE_ADDED_TO_TOAST, {
    toastId: string;
    messages: Message[];
}>;

export function createMessageWasAddedToPipeline(
    messageToAdd: MessageToAdd,
): MessageWasAddedToPipeline {
    return {
        type: ToasterEventTypes.MESSAGE_WAS_ADDED_TO_PIPELINE,
        payload: {
            messageToAdd,
        },
    };
}

export type MessageWasAddedToPipeline = Event<ToasterEventTypes.MESSAGE_WAS_ADDED_TO_PIPELINE, {
    messageToAdd: MessageToAdd;
}>;

export type MessageWasRemoved = Event<ToasterEventTypes.MESSAGE_WAS_REMOVED, {
    messageId: string;
}>;

export function createMessageWasRemoved(messageId: string): MessageWasRemoved {
    return {
        type: ToasterEventTypes.MESSAGE_WAS_REMOVED,
        payload: {
            messageId,
        },
    };
}

export function createToastIntroAnimationWasFinished(
    toastId: string,
): ToastIntroAnimationWasFinished {
    return {
        type: ToasterEventTypes.TOAST_INTRO_ANIMATION_WAS_FINISHED,
        payload: {
            toastId,
        },
    };
}

export type ToastIntroAnimationWasFinished = Event<ToasterEventTypes.TOAST_INTRO_ANIMATION_WAS_FINISHED, {
    toastId: string;
}>;

export function createToastOutroAnimationWasStarted(
    toastId: string,
): ToastOutroAnimationWasStarted {
    return {
        type: ToasterEventTypes.TOAST_OUTRO_ANIMATION_WAS_STARTED,
        payload: {
            toastId,
        },
    };
}

export type ToastOutroAnimationWasStarted = Event<ToasterEventTypes.TOAST_OUTRO_ANIMATION_WAS_STARTED, {
    toastId: string;
}>;

export function createToastWasAdded(toast: Toast): ToastWasAdded {
    return {
        type: ToasterEventTypes.TOAST_WAS_ADDED,
        payload: {
            toast,
        },
    };
}

export type ToastWasAdded = Event<ToasterEventTypes.TOAST_WAS_ADDED, {
    toast: Toast;
}>;

export function createToastWasRemoved(toastId: string): ToastWasRemoved {
    return {
        type: ToasterEventTypes.TOAST_WAS_REMOVED,
        payload: {
            toastId,
        },
    };
}

export type ToastWasRemoved = Event<ToasterEventTypes.TOAST_WAS_REMOVED, {
    toastId: string;
}>;
