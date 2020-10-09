import { Translation } from "packages/common/entity-base/common-types";

export enum ToastTypes {
    INFO = "info",
    SUCCESS = "success",
    WARNING = "warning",
    ERROR = "error",
}

export type MessageToAdd = {
    toastType: ToastTypes
    mustBeShownInSeparateToast: boolean
    message: Message
};

export type Message = {
    id: string
    canBeClosedManually: boolean
    automaticCloseDelayInMs: null | number
    content: Translation
    isIntroAnimationRunning?: boolean
    isOutroAnimationRunning?: boolean
};

export type Toast = {
    id: string;
    type: ToastTypes;
    messages: Message[];
    isIntroAnimationRunning?: boolean
    isOutroAnimationRunning?: boolean
};

export type ToasterState = {
    messagesToAdd: MessageToAdd[];
    toasts: Toast[];
};

export type ToasterSettings = {
    asyncToastWaitingTimeInMs: number
    toastIntroAnimationTimeInMs: number
    toastOutroAnimationTimeInMs: number
    toastMessageIntroAnimationTimeInMs: number
    toastMessageOutroAnimationTimeInMs: number
};

export type ToasterStateSelector<State = any> = (state: State) => ToasterState;
